const fs = require("fs").promises;
const axios = require("axios");
const cheerio = require("cheerio");
const Big = require("big.js");

const CACHE_DIR = ".cache";

const get = async (address) => {
  let html;

  try {
    await fs.mkdir(CACHE_DIR);
  } catch (e) {}

  const FILE_PATH = [CACHE_DIR, address].join("/");

  try {
    const file = await fs.readFile(FILE_PATH);
    html = file.toString();
    console.debug("CACHE HIT");
  } catch (e) {
    console.debug("CACHE MISS");
    const url = `https://etherscan.io/address/${address}`;
    const { data } = await axios.get(url);
    html = data;
    await fs.writeFile(FILE_PATH, html);
  }

  const $ = cheerio.load(html);

  const tokens = $(".list-custom-ERC20 > a")
    .map((i, el) => {
      const [amount, symbol] = $(el)
        .find(".list-amount")
        .first()
        .text()
        .split(" ");
      const usd = Number(
        $(el).find(".list-usd-value").first().text().substr(1)
      );
      const usdRate = Number(
        $(el).find(".list-usd-rate").first().text().substr(1)
      );
      const name = $(el).find(".list-name").first().text().split(" (")[0];

      return {
        usd,
        usdRate,
        name,
        amount: Number(amount),
        symbol,
      };
    })
    .get();

  const summary = $("#ContentPlaceHolder1_divSummary").text();

  const balance = Number(summary.match(/([0-9.]+) Ether/)[1]);

  const [usd, rate] = summary
    .match(/\$([0-9.]+)/g)
    .map((x) => Number(x.substr(1)));

  const ethereum = {
    usd,
    rate,
    name: "ETHEREUM",
    amount: balance,
    symbol: "ETH",
  };
  tokens.unshift(ethereum);

  const total = tokens.reduce(
    (acc, curr) => acc.add(new Big(curr.usd)),
    new Big(0)
  );

  return {
    // balance,
    tokens: tokens
      .filter((x) => x.amount > 0)
      .sort((a, b) => b.usd - a.usd)
      .map((t) => ({
        ...t,
        percentage: t.usd / total,
      })),
    total: Number(total.toFixed(2)),
  };
};

const address = process.env.ADDRESS;

get(address).then((data) => {
  console.log({
    address,
    ...data,
  });
});

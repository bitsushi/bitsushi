const axios = require("axios");
const cheerio = require("cheerio");

const get = async (address) => {
  const url = `https://etherscan.io/address/${address}`;

  const { data } = await axios.get(url);

  const $ = cheerio.load(data);

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

  return tokens;
};

get(process.env.ADDRESS).then(console.log);

const axios = require("axios");

async function getPriceMatrix(ids, currencies) {
  const { data } = await axios.request({
    url: "https://api.coingecko.com/api/v3/simple/price",
    method: "get",
    params: {
      ids: ids.join(","),
      vs_currencies: currencies.join(","),
      cache: Math.random(),
    },
  });
  return data;
}

async function go() {
  // const { data } = await axios.get(
  //   "https://api.coingecko.com/api/v3/coins/list"
  // );
  const data = await getPriceMatrix(["nexo", "bitcoin"], ["usd", "btc"]);

  console.log(data);
}

go();

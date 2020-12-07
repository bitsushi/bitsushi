import { get } from "./get";

get({ symbol: "KRAKEN:LTCUSD", columns: ["Recommend.All"] }).then(console.log);

import React from "react";
import Chart from "react-google-charts";

var colors = ["red", "orange", "blue", "green"];

function App() {
  return (
    <div className="App">
      <Chart
        width={400}
        height={"500px"}
        chartType="Sankey"
        loader={<div>Loading Chart</div>}
        options={{
          sankey: {
            node: {
              // colors,
              width: 20,
            },
            nodePadding: 5,
            link: {
              colorMode: "source",
            },
          },
        }}
        data={[
          [
            { type: "string", label: "src", role: "domain" },
            { type: "string", label: "tgt", role: "domain" },
            { type: "number", label: "val", role: "data" },
            { type: "string", label: "tooltip", role: "tooltip" },
            { type: "string", label: "tooltip", role: "style" },
          ],
          ["ETH", " ETH", 226.6, "convert abc", ""], // color: #ccc; opacity: 1
          ["BTC", " BTC", 50, "convert ghi", ""],
          ["ETH", " NEXO", 170.3, "convert ghi", ""],
          ["ETH", " WOZX", 50.5, "convert def", ""],
          ["BTC", " NEXO", 170.3, "convert ghi", ""],
        ]}
        // rootProps={{ "data-testid": "1" }}
      />
    </div>
  );
}

export default App;

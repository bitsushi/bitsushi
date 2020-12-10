import { riskBudgetingWeights } from "portfolio-allocation";

var w = riskBudgetingWeights(
  [
    [0.1, 0],
    [0, 0.2],
  ],
  [0.25, 0.75]
);

it("works", () => {
  expect(w).toEqual(1);
});

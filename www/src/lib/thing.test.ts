const bag = {
  eth: 10,
  btc: 20,
  etc: 20,
};

const weightings = {
  eth: 0,
  btc: 0.3,
  etc: 0.2,
};

const pct = (_bag: Record<string, number>) => {
  const total = Object.values(_bag).reduce((acc, curr) => acc + curr);
  return Object.entries(bag).reduce((acc, [k, v]) => {
    acc[k] = v / total;
    return acc;
  }, {} as Record<string, number>);
};

test("something", () => {
  const p = pct(bag);
  expect(p).toEqual({ btc: 0.4, etc: 0.4, eth: 0.2 });
});

// a = 10
// b = 10
// c = 80

// a = 0
// b = 1
// c = 0.7

// a = 0
// b =
// c = 0.2

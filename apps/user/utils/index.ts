export const DEFAULT_CURRENCY = {
  code: "usd",
  symbol: "$",
  name: "Us Dollar",
};

export const convertFromCents = (amount: number) => {
  return (amount / 100).toFixed(2);
};

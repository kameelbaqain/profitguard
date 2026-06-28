export function comparePrice({ currentPrice, previousPrice, quantity }) {
  const current = Number(currentPrice);
  const previous = Number(previousPrice);
  const count = Number(quantity);

  if (!Number.isFinite(previous) || previous <= 0) {
    return {
      priceDifference: 0,
      percentageIncrease: 0,
      batchLoss: 0,
      status: 'stable',
      shouldIntercept: false
    };
  }

  const priceDifference = current - previous;
  const percentageIncrease = (priceDifference / previous) * 100;
  const batchLoss = Math.max(priceDifference, 0) * count;
  const shouldIntercept = priceDifference > 0 && percentageIncrease >= 5;

  return {
    priceDifference,
    percentageIncrease,
    batchLoss,
    status: shouldIntercept ? 'spike' : 'stable',
    shouldIntercept
  };
}

export function formatJod(value, currency) {
  const amount = Number(value || 0).toFixed(3);
  return `${amount} ${currency}`;
}

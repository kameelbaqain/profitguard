export function todayInputValue() {
  return new Date().toISOString().slice(0, 10);
}

export function isThisMonth(dateValue) {
  const date = new Date(dateValue);
  const now = new Date();
  return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
}

export function formatShortDate(dateValue, locale) {
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-JO' : 'en-JO', {
    month: 'short',
    day: 'numeric'
  }).format(new Date(dateValue));
}

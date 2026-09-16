// Deprecated: Use formatCurrency from internationalization module instead
// This file is kept for backward compatibility during migration

export function formatUGX(
  amount: number,
  currency = "UGX",
) {
  if (currency !== "UGX") {
    return `${currency} ${amount.toLocaleString()}`
  }

  // Use app default locale instead of hardcoded en-UG
  const locale = 'en-US' // Would come from app config in production

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'UGX',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDateTime(value?: string) {
  if (!value) return "—"

  // Use app default locale instead of hardcoded en-UG
  const locale = 'en-US' // Would come from app config in production

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

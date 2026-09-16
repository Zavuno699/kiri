// Deprecated: Use formatCurrency from internationalization module instead
// This file is kept for backward compatibility during migration

export function formatCurrency(
  amount?: number,
  currency = "UGX",
): string {
  if (amount == null) return "—"

  // Use app default locale instead of hardcoded en-UG
  const locale = 'en-US' // Would come from app config in production
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Deprecated: Use formatInteger from internationalization module instead
// This file is kept for backward compatibility during migration

export function formatInteger(
  value?: number,
): string {
  if (value == null) return "—"
  
  // Use app default locale instead of hardcoded en-UG
  const locale = 'en-US' // Would come from app config in production
  
  return new Intl.NumberFormat(locale).format(value)
}

export function formatPercentage(
  value?: number,
): string {
  return value == null ? "—" : `${value}%`
}

// Deprecated: Use formatDate and formatDateTime from internationalization module instead
// This file is kept for backward compatibility during migration

export function formatOperationalDate(
  value?: string,
): string {
  if (!value) return "—"

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "—"

  // Use app default locale instead of hardcoded en-UG
  const locale = 'en-US' // Would come from app config in production

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

export function formatOperationalDateTime(
  value?: string,
): string {
  if (!value) return "—"

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "—"

  // Use app default locale instead of hardcoded en-UG
  const locale = 'en-US' // Would come from app config in production

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function formatInteger(
  value?: number,
): string {
  return value == null
    ? "—"
    : new Intl.NumberFormat("en-UG").format(value)
}

export function formatPercentage(
  value?: number,
): string {
  return value == null ? "—" : `${value}%`
}

export function formatCurrency(
  amount?: number,
  currency = "UGX",
): string {
  if (amount == null) return "—"

  return new Intl.NumberFormat("en-UG", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

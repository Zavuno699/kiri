export function formatUGX(
  amount: number,
  currency = "UGX",
) {
  if (currency !== "UGX") {
    return `${currency} ${amount.toLocaleString()}`
  }

  return new Intl.NumberFormat("en-UG", {
    style: "currency",
    currency: "UGX",
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDateTime(value?: string) {
  if (!value) return "—"

  return new Intl.DateTimeFormat("en-UG", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value))
}

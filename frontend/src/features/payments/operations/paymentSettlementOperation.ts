export function paymentSettlementReady(
  status?: string,
): boolean {
  const normalized = status?.toLowerCase()
  return (
    normalized === "settled" ||
    normalized === "completed"
  )
}

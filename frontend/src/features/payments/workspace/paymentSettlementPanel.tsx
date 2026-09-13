export function PaymentSettlementPanel({
  status,
  reference,
}: {
  status: string
  reference: string
}) {
  return (
    <div className="rounded-xl border border-white/7 bg-kiri-950/50 p-4">
      <div className="text-xs text-kiri-text-muted">
        Settlement
      </div>
      <div className="mt-1 text-sm font-bold text-kiri-text">
        {status}
      </div>
      <div className="mt-1 text-xs text-kiri-text-muted">
        {reference}
      </div>
    </div>
  )
}

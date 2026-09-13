export function PaymentWorkspaceEmpty() {
  return (
    <div className="rounded-xl border border-dashed border-white/10 px-6 py-10 text-center">
      <div className="text-sm font-semibold text-kiri-text">
        No payments selected
      </div>
      <div className="mt-1 text-xs text-kiri-text-muted">
        Select an item to inspect its operational state.
      </div>
    </div>
  )
}

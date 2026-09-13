export function SecuritySafetyPanel() {
  return (
    <div className="rounded-xl border border-kiri-red-500/20 bg-kiri-red-500/5 p-4">
      <div className="text-sm font-bold text-kiri-text">
        Security gate
      </div>
      <div className="mt-1 text-xs text-kiri-text-muted">
        Security operations remain fail-closed until verified production ingress exists.
      </div>
    </div>
  )
}

export function LockIngressBlocked() {
  return (
    <div className="rounded-xl border border-kiri-amber-500/20 bg-kiri-amber-500/5 p-5">
      <div className="text-sm font-bold text-kiri-text">
        Locks operations are blocked
      </div>
      <div className="mt-1 text-xs text-kiri-text-muted">
        Production HTTP ingress for this domain has not been verified.
      </div>
    </div>
  )
}

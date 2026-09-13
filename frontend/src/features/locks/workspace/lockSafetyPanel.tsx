export function LockSafetyPanel() {
  return (
    <div className="rounded-xl border border-kiri-amber-500/20 bg-kiri-amber-500/5 p-4">
      <div className="text-sm font-bold text-kiri-text">
        Safety gate
      </div>
      <div className="mt-1 text-xs text-kiri-text-muted">
        Lock commands remain unavailable until verified production ingress and authorization are present.
      </div>
    </div>
  )
}

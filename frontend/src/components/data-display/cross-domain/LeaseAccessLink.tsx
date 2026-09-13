export function LeaseAccessLink({
  leaseId,
  lockId,
  accessState,
}: {
  leaseId?: string
  lockId?: string
  accessState?: string
}) {
  return (
    <div className="rounded-xl border border-white/7 bg-kiri-900/60 p-4">
      <div className="text-[9px] uppercase tracking-[0.13em] text-kiri-text-muted">
        Lease / access relationship
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <div>
          <div className="text-[9px] text-kiri-text-muted">
            Lease
          </div>

          <div className="mt-1 break-all font-mono text-xs text-kiri-text-soft">
            {leaseId ?? "—"}
          </div>
        </div>

        <div>
          <div className="text-[9px] text-kiri-text-muted">
            Lock
          </div>

          <div className="mt-1 break-all font-mono text-xs text-kiri-text-soft">
            {lockId ?? "—"}
          </div>
        </div>

        <div>
          <div className="text-[9px] text-kiri-text-muted">
            Access
          </div>

          <div className="mt-1 text-xs font-bold text-kiri-text-soft">
            {accessState ?? "—"}
          </div>
        </div>
      </div>
    </div>
  )
}

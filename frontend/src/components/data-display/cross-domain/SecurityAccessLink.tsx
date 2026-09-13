export function SecurityAccessLink({
  subjectId,
  leaseId,
  lockId,
  frozen,
}: {
  subjectId?: string
  leaseId?: string
  lockId?: string
  frozen?: boolean
}) {
  return (
    <div className="rounded-xl border border-white/7 bg-kiri-900/60 p-4">
      <div className="text-[9px] uppercase tracking-[0.13em] text-kiri-text-muted">
        Security / access relationship
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="text-[9px] text-kiri-text-muted">
            Subject
          </div>

          <div className="mt-1 break-all font-mono text-xs text-kiri-text-soft">
            {subjectId ?? "—"}
          </div>
        </div>

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
            Freeze
          </div>

          <div
            className={[
              "mt-1 text-xs font-bold",
              frozen
                ? "text-kiri-red"
                : "text-kiri-green",
            ].join(" ")}
          >
            {frozen
              ? "ACTIVE"
              : "INACTIVE"}
          </div>
        </div>
      </div>
    </div>
  )
}

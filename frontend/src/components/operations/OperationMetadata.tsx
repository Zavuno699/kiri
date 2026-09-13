export function OperationMetadata({
  domain,
  correlationId,
  updatedAt,
}: {
  domain: string
  correlationId?: string
  updatedAt?: string
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <div>
        <div className="text-[10px] uppercase tracking-wider text-kiri-text-muted">
          Domain
        </div>
        <div className="mt-1 text-xs font-semibold text-kiri-text">
          {domain}
        </div>
      </div>

      <div>
        <div className="text-[10px] uppercase tracking-wider text-kiri-text-muted">
          Correlation
        </div>
        <div className="mt-1 truncate text-xs font-mono text-kiri-text">
          {correlationId ?? "—"}
        </div>
      </div>

      <div>
        <div className="text-[10px] uppercase tracking-wider text-kiri-text-muted">
          Updated
        </div>
        <div className="mt-1 text-xs font-semibold text-kiri-text">
          {updatedAt ?? "—"}
        </div>
      </div>
    </div>
  )
}

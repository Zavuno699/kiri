export function WorkspaceDataState({
  loading,
  degraded,
  empty,
}: {
  loading: boolean
  degraded: boolean
  empty: boolean
}) {
  if (loading) {
    return (
      <div className="rounded-xl border border-white/7 p-5 text-xs text-kiri-text-muted">
        Loading operational data…
      </div>
    )
  }

  if (degraded) {
    return (
      <div className="rounded-xl border border-kiri-amber-500/20 bg-kiri-amber-500/5 p-5 text-xs text-kiri-text-muted">
        Operational data is currently degraded or unavailable.
      </div>
    )
  }

  if (empty) {
    return (
      <div className="rounded-xl border border-dashed border-white/10 p-5 text-xs text-kiri-text-muted">
        No records available.
      </div>
    )
  }

  return null
}

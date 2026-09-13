export function DashboardCommandDialog({
  open,
}: {
  open: boolean
}) {
  if (!open) return null

  return (
    <div className="rounded-xl border border-white/10 bg-kiri-950 p-5">
      <div className="text-sm font-bold text-kiri-text">
        Dashboard command
      </div>
      <div className="mt-2 text-xs text-kiri-text-muted">
        Command execution is controlled by the Dashboard policy.
      </div>
    </div>
  )
}

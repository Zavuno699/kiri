export function DashboardStatusCard({
  status,
}: {
  status: string
}) {
  return (
    <div className="rounded-xl border border-white/7 bg-kiri-950/55 p-4">
      <div className="text-xs text-kiri-text-muted">
        Status
      </div>
      <div className="mt-1 text-sm font-bold text-kiri-text">
        {status}
      </div>
    </div>
  )
}

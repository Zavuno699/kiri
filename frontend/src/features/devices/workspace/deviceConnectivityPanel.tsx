export function DeviceConnectivityPanel({
  online,
}: {
  online?: boolean
}) {
  const label =
    online === undefined
      ? "Unknown"
      : online
        ? "Online"
        : "Offline"

  return (
    <div className="rounded-xl border border-white/7 bg-kiri-950/50 p-4">
      <div className="text-xs text-kiri-text-muted">
        Connectivity
      </div>
      <div className="mt-1 text-lg font-black text-kiri-text">
        {label}
      </div>
    </div>
  )
}

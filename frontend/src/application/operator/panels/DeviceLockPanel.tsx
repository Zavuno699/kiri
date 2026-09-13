export function DeviceLockPanel({
  deviceId,
  lockCount,
}: {
  deviceId: string
  lockCount: number
}) {
  return (
    <section className="rounded-xl border border-white/7 bg-kiri-950/55 p-5">
      <div className="text-sm font-bold text-kiri-text">
        Device / lock relationship
      </div>
      <div className="mt-2 text-xs text-kiri-text-muted">
        Device {deviceId}
      </div>
      <div className="mt-1 text-sm font-bold text-kiri-text">
        {lockCount} locks
      </div>
    </section>
  )
}

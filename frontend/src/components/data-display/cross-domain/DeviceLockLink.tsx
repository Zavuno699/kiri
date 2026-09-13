export function DeviceLockLink({
  deviceId,
  lockId,
  state,
}: {
  deviceId?: string
  lockId?: string
  state?: string
}) {
  return (
    <div className="rounded-xl border border-white/7 bg-kiri-900/60 p-4">
      <div className="text-[9px] uppercase tracking-[0.13em] text-kiri-text-muted">
        Device / lock relationship
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <div>
          <div className="text-[9px] text-kiri-text-muted">
            Device
          </div>

          <div className="mt-1 break-all font-mono text-xs text-kiri-text-soft">
            {deviceId ?? "—"}
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
            State
          </div>

          <div className="mt-1 text-xs font-bold text-kiri-text-soft">
            {state ?? "—"}
          </div>
        </div>
      </div>
    </div>
  )
}

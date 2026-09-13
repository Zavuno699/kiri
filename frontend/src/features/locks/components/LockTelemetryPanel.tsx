import type { LockTelemetry } from "../types/lockTelemetry"

export function LockTelemetryPanel({
  telemetry,
}: {
  telemetry: LockTelemetry
}) {
  return (
    <section className="rounded-2xl border border-white/7 bg-kiri-900/60 p-5">
      <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-kiri-blue-400">
        Lock telemetry
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="text-[10px] text-kiri-text-muted">
            Battery
          </div>
          <div className="mt-1 text-sm font-bold">
            {telemetry.batteryPercent == null
              ? "—"
              : `${telemetry.batteryPercent}%`}
          </div>
        </div>

        <div>
          <div className="text-[10px] text-kiri-text-muted">
            Temperature
          </div>
          <div className="mt-1 text-sm font-bold">
            {telemetry.temperatureC == null
              ? "—"
              : `${telemetry.temperatureC} °C`}
          </div>
        </div>

        <div>
          <div className="text-[10px] text-kiri-text-muted">
            Motor
          </div>
          <div className="mt-1 text-sm font-bold">
            {telemetry.motorHealth ?? "—"}
          </div>
        </div>

        <div>
          <div className="text-[10px] text-kiri-text-muted">
            Last seen
          </div>
          <div className="mt-1 text-sm font-bold">
            {telemetry.lastSeenAt
              ? new Date(telemetry.lastSeenAt).toLocaleString("en-UG")
              : "—"}
          </div>
        </div>
      </div>
    </section>
  )
}

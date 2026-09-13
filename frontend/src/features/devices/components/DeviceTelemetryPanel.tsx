import type { DeviceTelemetry } from "../types/deviceTelemetry"

export function DeviceTelemetryPanel({
  telemetry,
}: {
  telemetry: DeviceTelemetry
}) {
  const items = [
    ["Battery", telemetry.batteryPercent == null ? "—" : `${telemetry.batteryPercent}%`],
    ["Signal", telemetry.signalStrength == null ? "—" : `${telemetry.signalStrength}`],
    ["Temperature", telemetry.temperatureC == null ? "—" : `${telemetry.temperatureC} °C`],
    [
      "Last seen",
      telemetry.lastSeenAt
        ? new Date(telemetry.lastSeenAt).toLocaleString("en-UG")
        : "—",
    ],
  ]

  return (
    <section className="rounded-2xl border border-white/7 bg-kiri-900/60 p-5">
      <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-kiri-blue-400">
        Telemetry
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([label, value]) => (
          <div key={label}>
            <div className="text-[10px] text-kiri-text-muted">
              {label}
            </div>

            <div className="mt-1 text-sm font-bold text-kiri-text-soft">
              {value}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

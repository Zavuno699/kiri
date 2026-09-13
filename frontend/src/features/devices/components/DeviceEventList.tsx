import type { DeviceEvent } from "../types/deviceEvent"

export function DeviceEventList({
  events,
}: {
  events: DeviceEvent[]
}) {
  return (
    <div className="space-y-2">
      {events.map((event) => (
        <div
          key={event.id}
          className="rounded-xl border border-white/7 bg-kiri-900/60 p-3"
        >
          <div className="font-mono text-[10px] text-kiri-blue-400">
            {event.type}
          </div>

          <div className="mt-1 text-xs text-kiri-text-soft">
            {event.message}
          </div>

          <div className="mt-2 text-[10px] text-kiri-text-muted">
            {new Date(event.occurredAt).toLocaleString("en-UG")}
          </div>
        </div>
      ))}
    </div>
  )
}

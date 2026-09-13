import type { PropertyEvent } from "../types/propertyEvent"

export function PropertyEventList({
  events,
}: {
  events: PropertyEvent[]
}) {
  if (!events.length) {
    return (
      <div className="text-xs text-kiri-text-muted">
        No property events available.
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {events.map((event) => (
        <div
          key={event.id}
          className="rounded-xl border border-white/7 bg-kiri-900/60 p-3"
        >
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[10px] text-kiri-blue-400">
              {event.type}
            </span>

            <span className="text-[10px] text-kiri-text-muted">
              {new Date(event.occurredAt).toLocaleString("en-UG")}
            </span>
          </div>

          <div className="mt-2 text-xs text-kiri-text-soft">
            {event.message}
          </div>
        </div>
      ))}
    </div>
  )
}

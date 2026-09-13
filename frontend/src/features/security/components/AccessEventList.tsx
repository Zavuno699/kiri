import type { AccessEvent } from "../types/accessEvent"
import { StatusPill } from "../../../components/ui/StatusPill"

export function AccessEventList({
  events,
}: {
  events: AccessEvent[]
}) {
  return (
    <div className="space-y-2">
      {events.map((event) => {
        const tone =
          event.outcome === "allowed"
            ? "success"
            : event.outcome === "frozen" ||
                event.outcome === "revoked"
              ? "danger"
              : "warning"

        return (
          <div
            key={event.id}
            className="rounded-xl border border-white/7 bg-kiri-900/60 p-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-kiri-blue-400">
                  {event.action}
                </span>

                <StatusPill
                  label={event.outcome}
                  tone={tone}
                />
              </div>

              <span className="text-[10px] text-kiri-text-muted">
                {new Date(event.occurredAt).toLocaleString("en-UG")}
              </span>
            </div>

            {event.reason ? (
              <div className="mt-2 text-xs text-kiri-text-soft">
                {event.reason}
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

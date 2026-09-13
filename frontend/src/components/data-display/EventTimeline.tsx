import type { OperationalEvent } from "../../features/dashboard/types/dashboard"
import { OperationalStatus } from "../operations/OperationalStatus"

interface EventTimelineProps {
  events: OperationalEvent[]
}

const kindLabels: Record<OperationalEvent["kind"], string> = {
  lease: "Lease",
  payment: "Payment",
  lock: "Lock",
  device: "Device",
  security: "Security",
  system: "System",
}

export function EventTimeline({
  events,
}: EventTimelineProps) {
  if (events.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.015] px-5 py-8 text-center">
        <div className="text-sm font-semibold text-kiri-text-soft">
          No recent operational events
        </div>
        <div className="mt-1 text-xs text-kiri-text-muted">
          Live service events will appear here.
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {events.map((event) => (
        <article
          key={event.id}
          className="rounded-2xl border border-white/7 bg-kiri-900/65 p-4"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-kiri-blue-400">
                  {kindLabels[event.kind]}
                </span>

                <OperationalStatus
                  label=""
                  status={event.severity}
                />
              </div>

              <h4 className="mt-2 text-sm font-bold text-kiri-text">
                {event.title}
              </h4>

              <p className="mt-1 text-xs leading-5 text-kiri-text-muted">
                {event.description}
              </p>

              {event.reference ? (
                <div className="mt-2 font-mono text-[10px] text-kiri-text-muted">
                  {event.reference}
                </div>
              ) : null}
            </div>

            <time
              className="shrink-0 text-[10px] font-medium text-kiri-text-muted"
              dateTime={event.occurredAt}
            >
              {new Date(event.occurredAt).toLocaleString()}
            </time>
          </div>
        </article>
      ))}
    </div>
  )
}

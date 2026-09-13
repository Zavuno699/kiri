import type { SecurityEvent } from "../types/security"
import { SecuritySeverityPill } from "./SecurityStatus"

interface SecurityEventTimelineProps {
  events: SecurityEvent[]
}

export function SecurityEventTimeline({
  events,
}: SecurityEventTimelineProps) {
  if (events.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 px-5 py-10 text-center">
        <div className="text-sm font-semibold text-kiri-text-soft">
          No security events available
        </div>

        <div className="mt-1 text-xs text-kiri-text-muted">
          Security events will appear when the security event API is connected.
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {events.map((event) => (
        <article
          key={event.id}
          className="rounded-2xl border border-white/7 bg-kiri-900/60 p-4"
        >
          <div className="flex flex-col justify-between gap-3 sm:flex-row">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <SecuritySeverityPill severity={event.severity} />

                <span className="font-mono text-[10px] text-kiri-blue-400">
                  {event.eventType}
                </span>
              </div>

              <div className="mt-2 text-sm font-semibold text-kiri-text">
                {event.message}
              </div>
            </div>

            <div className="text-xs text-kiri-text-muted">
              {new Date(event.occurredAt).toLocaleString("en-UG")}
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[10px] text-kiri-text-muted">
            {event.subjectId ? <span>subject: {event.subjectId}</span> : null}
            {event.propertyId ? <span>property: {event.propertyId}</span> : null}
            {event.leaseId ? <span>lease: {event.leaseId}</span> : null}
            {event.lockId ? <span>lock: {event.lockId}</span> : null}
            {event.correlationId ? (
              <span>corr: {event.correlationId}</span>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  )
}

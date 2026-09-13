import {
  listAuditEvents,
} from "../../../application/audit/store/auditStore";

export function AuditTimeline() {
  const events = [...listAuditEvents()]
    .sort(
      (left, right) =>
        Date.parse(right.occurredAt) -
        Date.parse(left.occurredAt),
    )
    .slice(0, 20);

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Audit timeline
      </div>

      <div className="mt-3 space-y-2">
        {events.map((event) => (
          <div
            key={event.id}
            className="rounded-lg border border-slate-800/60 px-3 py-2"
          >
            <div className="text-xs text-slate-300">
              {event.action}
            </div>
            <div className="mt-1 text-[11px] text-slate-500">
              {event.category} · {event.outcome} ·{" "}
              {event.occurredAt}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

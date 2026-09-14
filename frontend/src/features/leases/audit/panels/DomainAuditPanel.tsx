import {
  listAuditEvents,
} from "../../../../application/audit/store/auditStore";

import {
  queryLeasesAudit,
} from "../domainAudit";

export function DomainAuditPanel() {
  const events = queryLeasesAudit(
    listAuditEvents(),
    20,
  );

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/30 p-4">
      <div className="text-sm font-semibold">
        Leases audit
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
              {event.outcome} · {event.occurredAt}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

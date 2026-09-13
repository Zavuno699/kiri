import {
  listAuditEvents,
} from "../../../application/audit/store/auditStore";

import {
  selectDeniedAuditEvents,
} from "../../../application/audit/selectors/auditSelectors";

export function DeniedAccessPanel() {
  const denied = selectDeniedAuditEvents(
    listAuditEvents(),
  ).slice(0, 20);

  return (
    <section className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
      <div className="text-sm font-semibold">
        Denied access activity
      </div>

      <div className="mt-3 space-y-2">
        {denied.map((event) => (
          <div
            key={event.id}
            className="rounded-lg border border-red-500/10 px-3 py-2"
          >
            <div className="text-xs text-red-100">
              {event.action}
            </div>
            <div className="mt-1 text-[11px] text-red-200/60">
              {event.reason ?? "access denied"}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

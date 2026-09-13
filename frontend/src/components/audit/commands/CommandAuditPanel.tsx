import {
  listAuditEvents,
} from "../../../application/audit/store/auditStore";

import {
  selectCommandAuditEvents,
} from "../../../application/audit/selectors/auditSelectors";

export function CommandAuditPanel() {
  const commands = selectCommandAuditEvents(
    listAuditEvents(),
  ).slice(0, 20);

  return (
    <section className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
      <div className="text-sm font-semibold">
        Command audit
      </div>

      <div className="mt-3 space-y-2">
        {commands.map((event) => (
          <div
            key={event.id}
            className="rounded-lg border border-blue-500/10 px-3 py-2"
          >
            <div className="text-xs text-blue-100">
              {event.command ?? event.action}
            </div>
            <div className="mt-1 text-[11px] text-blue-200/60">
              {event.outcome} ·{" "}
              {event.occurredAt}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

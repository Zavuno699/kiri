import {
  getAuditRuntimeSnapshot,
} from "../../../application/audit/runtime/auditRuntime";

export function AuditSummaryPanel() {
  const snapshot = getAuditRuntimeSnapshot();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Security audit summary
      </div>

      <div className="mt-3 grid gap-2 text-xs text-slate-400 sm:grid-cols-3">
        <div>Events: {snapshot.events.length}</div>
        <div>Denied access: {snapshot.access.denied}</div>
        <div>Command events: {snapshot.commands.total}</div>
      </div>
    </section>
  );
}

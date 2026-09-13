import {
  getSecuritySnapshot,
} from "../../../application/security/diagnostics/securitySnapshot";

export function SecurityAuditSummary() {
  const state =
    getSecuritySnapshot();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Security audit
      </div>

      <div className="mt-2 text-xs text-slate-400">
        Recorded security decisions:{" "}
        {state.auditCount}
      </div>
    </section>
  );
}


import { listSecurityAuditRecords } from "../../../application/security/audit/auditRecorder";

export function SecurityAuditPanel() {
  const records = listSecurityAuditRecords();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-900/40 p-4">
      <div className="text-sm font-semibold">Security audit</div>
      <div className="mt-3 text-xs text-slate-400">
        Records: {records.length}
      </div>
    </section>
  );
}


import { SecurityAuditWorkspace } from "../../features/security/auditWorkspace/SecurityAuditWorkspace";
import { OperatorActivityTimeline } from "../../components/operator/activity/OperatorActivityTimeline";
import { OperatorActivityMetrics } from "../../components/operator/activity/OperatorActivityMetrics";

export function SecurityAuditPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-4">
        <SecurityAuditWorkspace />
        <div className="grid gap-4 lg:grid-cols-3">
          <OperatorActivityMetrics />
          <div className="lg:col-span-2">
            <OperatorActivityTimeline />
          </div>
        </div>
      </div>
    </main>
  );
}

import { RuntimeIntegrityPanel } from "../../components/integrity/runtime/RuntimeIntegrityPanel";
import { RecoveryStatusPanel } from "../../components/integrity/recovery/RecoveryStatusPanel";
import { ReconciliationStatusPanel } from "../../components/integrity/reconciliation/ReconciliationStatusPanel";

export function OperationalIntegrityPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-4">
        <RuntimeIntegrityPanel />

        <div className="grid gap-4 lg:grid-cols-2">
          <RecoveryStatusPanel />
          <ReconciliationStatusPanel />
        </div>
      </div>
    </main>
  );
}

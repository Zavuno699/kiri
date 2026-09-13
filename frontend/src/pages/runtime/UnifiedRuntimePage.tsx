import {
  UnifiedRuntimeStatusPanel,
} from "../../components/unifiedRuntime/status/UnifiedRuntimeStatusPanel";

import {
  RuntimeSubsystemPanel,
} from "../../components/unifiedRuntime/subsystems/RuntimeSubsystemPanel";

import {
  UnifiedOperationalScore,
} from "../../components/unifiedRuntime/score/UnifiedOperationalScore";

import {
  RuntimeReasonPanel,
} from "../../components/unifiedRuntime/reasons/RuntimeReasonPanel";

import {
  UnifiedOperationalStatePanel,
} from "../../components/operationalState/UnifiedOperationalStatePanel";

export function UnifiedRuntimePage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-4">
        <UnifiedRuntimeStatusPanel />

        <div className="grid gap-4 lg:grid-cols-2">
          <UnifiedOperationalScore />
          <RuntimeReasonPanel />
        </div>

        <UnifiedOperationalStatePanel />
        <RuntimeSubsystemPanel />
      </div>
    </main>
  );
}

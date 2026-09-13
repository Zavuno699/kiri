import {
  GlobalOperatorControlPanel,
} from "../../components/operatorControl/state/GlobalOperatorControlPanel";

import {
  WorkflowControlPanel,
} from "../../components/operatorControl/workflow/WorkflowControlPanel";

import {
  GlobalHealthPanel,
} from "../../components/operatorControl/health/GlobalHealthPanel";

import {
  GlobalDegradedModePanel,
} from "../../components/operatorControl/degraded/GlobalDegradedModePanel";

export function GlobalOperatorControlPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-4">
        <GlobalOperatorControlPanel />

        <div className="grid gap-4 lg:grid-cols-3">
          <WorkflowControlPanel />
          <GlobalHealthPanel />
          <GlobalDegradedModePanel />
        </div>
      </div>
    </main>
  );
}

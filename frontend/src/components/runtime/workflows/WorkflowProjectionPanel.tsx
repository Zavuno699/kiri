import {
  getProjectionDiagnostics,
} from "../../../application/projections/diagnostics/projectionDiagnostics";

import {
  getWorkflowDiagnostics,
} from "../../../application/workflows/diagnostics/workflowDiagnostics";

export function WorkflowProjectionPanel() {
  const projections =
    getProjectionDiagnostics();

  const workflows =
    getWorkflowDiagnostics();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Workflow projection runtime
      </div>

      <div className="mt-3 grid gap-2 text-xs text-slate-400 sm:grid-cols-3">
        <div>
          Projections:{" "}
          {projections.projectionCount}
        </div>

        <div>
          Resource states:{" "}
          {projections.resourceStateCount}
        </div>

        <div>
          Workflows:{" "}
          {workflows.workflowCount}
        </div>
      </div>
    </section>
  );
}

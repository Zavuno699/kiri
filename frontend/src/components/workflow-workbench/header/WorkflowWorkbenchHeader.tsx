import {
  useEffect,
  useState,
} from "react";

import {
  getWorkflowDiagnostics,
} from "../../../application/workflowOrchestration/diagnostics/workflowDiagnostics";

import {
  subscribeWorkflowExecution,
} from "../../../application/workflowOrchestration/state/workflowExecutionStore";

export function WorkflowWorkbenchHeader() {
  const [
    diagnostics,
    setDiagnostics,
  ] = useState(
    getWorkflowDiagnostics(),
  );

  useEffect(
    () =>
      subscribeWorkflowExecution(
        () =>
          setDiagnostics(
            getWorkflowDiagnostics(),
          ),
      ),
    [],
  );

  return (
    <section className="rounded-xl border border-slate-700/60 bg-slate-950/60 p-5">
      <div className="text-xs uppercase tracking-[0.18em] text-blue-300/70">
        Global workflow fabric
      </div>

      <div className="mt-2 text-xl font-semibold text-slate-100">
        Workflow / Transaction Workbench
      </div>

      <div className="mt-1 text-sm text-slate-500">
        Policy-guarded cross-domain workflow orchestration and compensation.
      </div>

      <div className="mt-4 grid gap-2 text-xs text-slate-400 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          Workflows:{" "}
          {diagnostics.workflowCount}
        </div>

        <div>
          Steps:{" "}
          {diagnostics.stepCount}
        </div>

        <div>
          Compensation:{" "}
          {diagnostics.compensationCount}
        </div>

        <div>
          Transactional:{" "}
          {diagnostics.transactionalCount}
        </div>
      </div>
    </section>
  );
}

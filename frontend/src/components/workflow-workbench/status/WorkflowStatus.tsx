import {
  getWorkflowCoverage,
} from "../../../application/workflowOrchestration/diagnostics/workflowCoverage";

export function WorkflowStatus() {
  const coverage =
    getWorkflowCoverage();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-xs uppercase tracking-wider text-slate-500">
        Workflow fabric status
      </div>

      <div className="mt-3 grid gap-2 text-xs text-slate-400 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          Workflows:{" "}
          {coverage.workflows}
        </div>

        <div>
          Steps:{" "}
          {coverage.steps}
        </div>

        <div>
          Compensation:{" "}
          {coverage.compensations}
        </div>

        <div>
          Transactional:{" "}
          {coverage.transactional}
        </div>

        <div>
          Ready:{" "}
          {coverage.ready
            ? "yes"
            : "pending"}
        </div>
      </div>
    </section>
  );
}

import {
  getWorkflowState,
} from "../../../application/workflowOrchestration/state/workflowStore";

export function WorkflowControlPanel() {
  const state =
    getWorkflowState();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Cross-domain workflows
      </div>

      <div className="mt-2 text-xs text-slate-400">
        Definitions: {state.definitions.length}
      </div>

      <div className="mt-1 text-xs text-slate-500">
        Executions: {state.executions.length}
      </div>

      <div className="mt-1 text-xs text-slate-500">
        Active: {state.activeWorkflowId ?? "none"}
      </div>
    </section>
  );
}

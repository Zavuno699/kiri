import {
  useEffect,
  useState,
} from "react";

import {
  getWorkflowExecutionState,
  subscribeWorkflowExecution,
} from "../../../application/workflowOrchestration/state/workflowExecutionStore";

import {
  orchestrateAndAuditWorkflow,
} from "../../../application/workflowOrchestration/runtime/orchestrateAndAuditWorkflow";

interface Props {
  workflowId: string;
  entityId?: string | null;
}

export function WorkflowTransactionPanel({
  workflowId,
  entityId =
    null,
}: Props) {
  const [
    state,
    setState,
  ] = useState(
    getWorkflowExecutionState(),
  );

  useEffect(
    () =>
      subscribeWorkflowExecution(
        () =>
          setState(
            getWorkflowExecutionState(),
          ),
      ),
    [],
  );

  function execute() {
    orchestrateAndAuditWorkflow({
      workflowId,
      entityId,
      parameters:
        {
          active:
            true,
          operational:
            true,
          controllable:
            true,
          frozen:
            false,
          consistent:
            true,
        },
      confirmed:
        true,
      subjectId:
        "operator",
      correlationId:
        crypto.randomUUID(),
    });
  }

  return (
    <section className="rounded-xl border border-slate-700/60 bg-slate-950/60 p-4">
      <div className="text-sm font-semibold text-slate-200">
        Transaction execution
      </div>

      <button
        type="button"
        onClick={
          execute
        }
        disabled={
          state.loading
        }
        className="mt-3 rounded-lg border border-blue-500/40 bg-blue-500/10 px-3 py-2 text-xs text-blue-200 disabled:opacity-40"
      >
        {state.loading
          ? "Executing..."
          : "Execute workflow"}
      </button>

      <div className="mt-3 grid gap-2 text-xs text-slate-400 sm:grid-cols-2">
        <div>
          Outcome:{" "}
          {state.outcome}
        </div>

        <div>
          Active step:{" "}
          {state.activeStepId ??
            "none"}
        </div>

        <div>
          Completed:{" "}
          {state.completedStepIds.length}
        </div>

        <div>
          Compensated:{" "}
          {state.compensationStepIds.length}
        </div>
      </div>

      {state.reasons.length ? (
        <div className="mt-3 space-y-1 text-xs text-amber-500">
          {state.reasons.map(
            (reason) => (
              <div
                key={reason}
              >
                {reason}
              </div>
            ),
          )}
        </div>
      ) : null}
    </section>
  );
}

import {
  createWorkflowExecution,
} from "../engine/createWorkflowExecution";

import {
  getWorkflowState,
  setWorkflowState,
} from "../state/workflowStore";

export function beginWorkflow(
  definitionKey: string,
  correlationId?: string | null,
): string {
  const execution =
    createWorkflowExecution(
      definitionKey,
      correlationId,
    );

  const state =
    getWorkflowState();

  setWorkflowState({
    ...state,
    executions: [
      ...state.executions,
      execution,
    ],
    activeWorkflowId:
      execution.workflowId,
  });

  return execution.workflowId;
}

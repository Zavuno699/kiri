import type {
  WorkflowState,
} from "../state/workflowState";

export const selectActiveWorkflow = (
  state: WorkflowState,
) =>
  state.executions.find(
    (execution) =>
      execution.workflowId === state.activeWorkflowId,
  ) ?? null;

export const selectFailedWorkflows = (
  state: WorkflowState,
) =>
  state.executions.filter(
    (execution) =>
      execution.status === "failed",
  );

export const selectRecoveringWorkflows = (
  state: WorkflowState,
) =>
  state.executions.filter(
    (execution) =>
      execution.status === "recovering",
  );

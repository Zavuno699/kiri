import type {
  WorkflowExecution,
} from "../contracts/workflowExecution";

export function recoverWorkflow(
  execution: WorkflowExecution,
  reason: string,
): WorkflowExecution {
  return {
    ...execution,
    status: "recovering",
    reason,
  };
}

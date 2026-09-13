import type {
  WorkflowExecution,
} from "../contracts/workflowExecution";

export function completeWorkflow(
  execution: WorkflowExecution,
): WorkflowExecution {
  return {
    ...execution,
    status: "completed",
    currentStep: null,
    failedStep: null,
    reason: null,
  };
}

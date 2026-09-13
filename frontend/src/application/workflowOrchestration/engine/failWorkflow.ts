import type {
  WorkflowExecution,
} from "../contracts/workflowExecution";

export function failWorkflow(
  execution: WorkflowExecution,
  step: string,
  reason: string,
): WorkflowExecution {
  return {
    ...execution,
    status: "failed",
    currentStep: step,
    failedStep: step,
    reason,
  };
}

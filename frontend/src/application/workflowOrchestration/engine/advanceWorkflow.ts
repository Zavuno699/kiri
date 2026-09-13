import type {
  WorkflowExecution,
} from "../contracts/workflowExecution";

export function advanceWorkflow(
  execution: WorkflowExecution,
  step: string,
): WorkflowExecution {
  return {
    ...execution,
    status: "running",
    currentStep: step,
    completedSteps: execution.completedSteps.includes(step)
      ? execution.completedSteps
      : [...execution.completedSteps, step],
    failedStep: null,
    reason: null,
  };
}

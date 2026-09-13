import type {
  WorkflowExecution,
} from "../contracts/workflowExecution";

export function createWorkflowExecution(
  definitionKey: string,
  correlationId?: string | null,
): WorkflowExecution {
  return {
    workflowId: crypto.randomUUID(),
    definitionKey,
    status: "running",
    currentStep: null,
    completedSteps: [],
    failedStep: null,
    reason: null,
    correlationId: correlationId ?? null,
  };
}

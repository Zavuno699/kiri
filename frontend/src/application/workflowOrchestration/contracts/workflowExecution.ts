export type WorkflowExecutionStatus =
  | "idle"
  | "running"
  | "blocked"
  | "completed"
  | "failed"
  | "recovering"
  | "degraded";

export interface WorkflowExecution {
  workflowId: string;
  definitionKey: string;
  status: WorkflowExecutionStatus;
  currentStep: string | null;
  completedSteps: string[];
  failedStep: string | null;
  reason: string | null;
  correlationId: string | null;
}

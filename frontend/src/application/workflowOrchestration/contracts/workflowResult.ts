export type WorkflowOutcome =
  | "accepted"
  | "blocked"
  | "running"
  | "completed"
  | "failed"
  | "compensated";

export interface WorkflowResult {
  workflowId: string;
  correlationId: string;
  outcome: WorkflowOutcome;
  completedStepIds: string[];
  failedStepId: string | null;
  compensationStepIds: string[];
  reasons: string[];
}

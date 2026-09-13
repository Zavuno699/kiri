export interface WorkflowExecutionState {
  activeWorkflowId: string | null;
  correlationId: string | null;
  entityId: string | null;
  outcome:
    | "idle"
    | "accepted"
    | "running"
    | "blocked"
    | "completed"
    | "failed"
    | "compensated";
  activeStepId: string | null;
  completedStepIds: string[];
  failedStepId: string | null;
  compensationStepIds: string[];
  reasons: string[];
  loading: boolean;
  error: string | null;
}

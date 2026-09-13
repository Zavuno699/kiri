export interface WorkflowContext {
  workflowId: string;
  correlationId: string | null;
  causationId: string | null;
  startedAt: string;
}

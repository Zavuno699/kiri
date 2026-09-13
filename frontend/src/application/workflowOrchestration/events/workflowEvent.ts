export interface WorkflowEvent {
  type:
    | "workflow.started"
    | "workflow.step.completed"
    | "workflow.failed"
    | "workflow.recovering"
    | "workflow.completed";
  workflowId: string;
  definitionKey: string;
  occurredAt: string;
  step?: string | null;
  reason?: string | null;
  correlationId?: string | null;
}

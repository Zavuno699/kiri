export interface WorkflowRequest {
  workflowId: string;
  entityId: string | null;
  parameters: Record<string, unknown>;
  confirmed: boolean;
  subjectId: string | null;
  correlationId: string;
}

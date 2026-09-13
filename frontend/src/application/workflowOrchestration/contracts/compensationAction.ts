export interface CompensationAction {
  id: string;
  workflowId: string;
  stepId: string;
  action: string;
  domain: string;
  reason: string;
  enabled: boolean;
}

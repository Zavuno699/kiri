export interface WorkflowDecision {
  workflowId: string;
  allowed: boolean;
  policyDecisionId: string | null;
  risk: string;
  reasons: string[];
  evaluatedAt: string;
}

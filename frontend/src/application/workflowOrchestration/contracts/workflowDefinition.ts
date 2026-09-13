export type WorkflowRisk =
  | "low"
  | "medium"
  | "high"
  | "critical";

export interface WorkflowDefinition {
  id: string;
  name: string;
  label: string;
  description: string;
  domains: string[];
  risk: WorkflowRisk;
  transactional: boolean;
  requiresPolicyApproval: boolean;
  enabled: boolean;
}

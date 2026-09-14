import type {
  WorkflowDefinition,
} from "../contracts/workflowDefinition";

export const securityRecoveryWorkflow: WorkflowDefinition = {
  id: "security-recovery",
  name: "Security runtime recovery",
  label: "Security Recovery",
  description: "Recover security runtime state",
  domains: [
    "security",
    "dashboard",
  ],
  risk: "critical",
  transactional: false,
  requiresPolicyApproval: true,
  enabled: true,
};

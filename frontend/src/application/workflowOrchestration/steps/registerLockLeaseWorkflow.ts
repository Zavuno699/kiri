import type {
  WorkflowDefinition,
} from "../contracts/workflowDefinition";

export const lockLeaseWorkflow: WorkflowDefinition = {
  id: "lease-lock-authorization",
  name: "Lease lock authorization",
  label: "Lock Authorization",
  description: "Authorize lock access for lease",
  domains: [
    "leases",
    "locks",
  ],
  risk: "high",
  transactional: true,
  requiresPolicyApproval: true,
  enabled: true,
};

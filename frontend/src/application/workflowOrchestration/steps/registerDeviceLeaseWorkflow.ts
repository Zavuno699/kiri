import type {
  WorkflowDefinition,
} from "../contracts/workflowDefinition";

export const deviceLeaseWorkflow: WorkflowDefinition = {
  id: "lease-device-authorization",
  name: "Lease device authorization",
  label: "Device Authorization",
  description: "Authorize device access for lease",
  domains: [
    "leases",
    "devices",
  ],
  risk: "medium",
  transactional: true,
  requiresPolicyApproval: true,
  enabled: true,
};

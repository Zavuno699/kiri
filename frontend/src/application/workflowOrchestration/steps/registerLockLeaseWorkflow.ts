import type {
  WorkflowDefinition,
} from "../contracts/workflowDefinition";

export const lockLeaseWorkflow: WorkflowDefinition = {
  key: "lease-lock-authorization",
  name: "Lease lock authorization",
  domains: [
    "leases",
    "locks",
  ],
  steps: [
    {
      key: "lease-valid",
      domain: "leases",
      required: true,
      reversible: true,
    },
    {
      key: "lock-entitlement-evaluated",
      domain: "locks",
      required: true,
      reversible: true,
    },
    {
      key: "lock-command-authorized",
      domain: "locks",
      required: true,
      reversible: true,
    },
  ],
};

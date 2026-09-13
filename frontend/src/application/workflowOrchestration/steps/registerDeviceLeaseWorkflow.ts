import type {
  WorkflowDefinition,
} from "../contracts/workflowDefinition";

export const deviceLeaseWorkflow: WorkflowDefinition = {
  key: "lease-device-authorization",
  name: "Lease device authorization",
  domains: [
    "leases",
    "devices",
  ],
  steps: [
    {
      key: "lease-authorized",
      domain: "leases",
      required: true,
      reversible: true,
    },
    {
      key: "device-entitlement-projected",
      domain: "devices",
      required: true,
      reversible: true,
    },
    {
      key: "device-command-authorized",
      domain: "devices",
      required: true,
      reversible: true,
    },
  ],
};

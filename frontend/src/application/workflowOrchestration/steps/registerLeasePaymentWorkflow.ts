import type {
  WorkflowDefinition,
} from "../contracts/workflowDefinition";

export const leasePaymentWorkflow: WorkflowDefinition = {
  key: "lease-payment-entitlement",
  name: "Lease payment entitlement",
  domains: [
    "payments",
    "leases",
  ],
  steps: [
    {
      key: "payment-observed",
      domain: "payments",
      required: true,
      reversible: false,
    },
    {
      key: "payment-settled",
      domain: "payments",
      required: true,
      reversible: false,
    },
    {
      key: "lease-entitlement-updated",
      domain: "leases",
      required: true,
      reversible: true,
    },
    {
      key: "entitlement-projected",
      domain: "leases",
      required: true,
      reversible: true,
    },
  ],
};

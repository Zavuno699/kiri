import type {
  WorkflowDefinition,
} from "../contracts/workflowDefinition";

export const leasePaymentWorkflow: WorkflowDefinition = {
  id: "lease-payment-entitlement",
  name: "Lease payment entitlement",
  label: "Payment Entitlement",
  description: "Process lease payment and update entitlement",
  domains: [
    "payments",
    "leases",
  ],
  risk: "low",
  transactional: true,
  requiresPolicyApproval: false,
  enabled: true,
};

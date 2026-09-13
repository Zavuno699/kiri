import {
  registerWorkflow,
} from "../registry/workflowRegistry";

const workflows = [
  {
    id:
      "property-to-lease-activation",
    name:
      "property-to-lease-activation",
    label:
      "Property → Lease activation",
    description:
      "Coordinate property context validation and lease activation.",
    domains:
      [
        "properties",
        "leases",
      ],
    risk:
      "medium" as const,
    transactional:
      true,
    requiresPolicyApproval:
      true,
    enabled:
      true,
  },

  {
    id:
      "lease-payment-reconciliation",
    name:
      "lease-payment-reconciliation",
    label:
      "Lease payment reconciliation",
    description:
      "Coordinate lease and payment consistency.",
    domains:
      [
        "leases",
        "payments",
      ],
    risk:
      "high" as const,
    transactional:
      true,
    requiresPolicyApproval:
      true,
    enabled:
      true,
  },

  {
    id:
      "lease-device-binding",
    name:
      "lease-device-binding",
    label:
      "Lease → Device binding",
    description:
      "Coordinate lease authorization with device state.",
    domains:
      [
        "leases",
        "devices",
      ],
    risk:
      "high" as const,
    transactional:
      true,
    requiresPolicyApproval:
      true,
    enabled:
      true,
  },

  {
    id:
      "lease-lock-authorization",
    name:
      "lease-lock-authorization",
    label:
      "Lease → Lock authorization",
    description:
      "Coordinate lease, device, lock, and security policy.",
    domains:
      [
        "leases",
        "devices",
        "locks",
        "security",
      ],
    risk:
      "critical" as const,
    transactional:
      true,
    requiresPolicyApproval:
      true,
    enabled:
      true,
  },

  {
    id:
      "security-lock-recovery",
    name:
      "security-lock-recovery",
    label:
      "Security → Lock recovery",
    description:
      "Coordinate controlled recovery of a protected lock context.",
    domains:
      [
        "security",
        "locks",
        "devices",
      ],
    risk:
      "critical" as const,
    transactional:
      true,
    requiresPolicyApproval:
      true,
    enabled:
      true,
  },

  {
    id:
      "device-reconciliation-flow",
    name:
      "device-reconciliation-flow",
    label:
      "Device reconciliation",
    description:
      "Reconcile device state and downstream lock context.",
    domains:
      [
        "devices",
        "locks",
      ],
    risk:
      "high" as const,
    transactional:
      true,
    requiresPolicyApproval:
      true,
    enabled:
      true,
  },
];

export function registerCanonicalWorkflows(): void {
  for (
    const workflow of
      workflows
  ) {
    registerWorkflow(
      workflow,
    );
  }
}

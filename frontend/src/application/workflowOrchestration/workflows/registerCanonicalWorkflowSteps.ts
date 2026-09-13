import {
  registerWorkflowStep,
} from "../registry/workflowStepRegistry";

const steps = [
  {
    id:
      "property-to-lease.policy",
    workflowId:
      "property-to-lease-activation",
    order:
      1,
    type:
      "policy" as const,
    name:
      "property-lease-policy",
    domain:
      "leases",
    action:
      "lease.activate",
    required:
      true,
    compensatable:
      false,
  },

  {
    id:
      "property-to-lease.activate",
    workflowId:
      "property-to-lease-activation",
    order:
      2,
    type:
      "command" as const,
    name:
      "activate-lease",
    domain:
      "leases",
    action:
      "lease.refresh",
    required:
      true,
    compensatable:
      true,
  },

  {
    id:
      "lease-payment.policy",
    workflowId:
      "lease-payment-reconciliation",
    order:
      1,
    type:
      "policy" as const,
    name:
      "payment-integrity-policy",
    domain:
      "payments",
    action:
      "payment.refresh",
    required:
      true,
    compensatable:
      false,
  },

  {
    id:
      "lease-payment.reconcile",
    workflowId:
      "lease-payment-reconciliation",
    order:
      2,
    type:
      "command" as const,
    name:
      "reconcile-payment",
    domain:
      "payments",
    action:
      "payment.refresh",
    required:
      true,
    compensatable:
      true,
  },

  {
    id:
      "lease-device.policy",
    workflowId:
      "lease-device-binding",
    order:
      1,
    type:
      "policy" as const,
    name:
      "device-binding-policy",
    domain:
      "devices",
    action:
      "device.reconcile",
    required:
      true,
    compensatable:
      false,
  },

  {
    id:
      "lease-device.reconcile",
    workflowId:
      "lease-device-binding",
    order:
      2,
    type:
      "command" as const,
    name:
      "reconcile-device",
    domain:
      "devices",
    action:
      "device.reconcile",
    required:
      true,
    compensatable:
      true,
  },

  {
    id:
      "lease-lock.policy",
    workflowId:
      "lease-lock-authorization",
    order:
      1,
    type:
      "policy" as const,
    name:
      "lock-authorization-policy",
    domain:
      "locks",
    action:
      "lock.secure",
    required:
      true,
    compensatable:
      false,
  },

  {
    id:
      "lease-lock.device",
    workflowId:
      "lease-lock-authorization",
    order:
      2,
    type:
      "query" as const,
    name:
      "resolve-device-context",
    domain:
      "devices",
    action:
      "device.refresh",
    required:
      true,
    compensatable:
      false,
  },

  {
    id:
      "lease-lock.secure",
    workflowId:
      "lease-lock-authorization",
    order:
      3,
    type:
      "command" as const,
    name:
      "secure-lock",
    domain:
      "locks",
    action:
      "lock.secure",
    required:
      true,
    compensatable:
      true,
  },

  {
    id:
      "security-recovery.policy",
    workflowId:
      "security-lock-recovery",
    order:
      1,
    type:
      "policy" as const,
    name:
      "security-recovery-policy",
    domain:
      "security",
    action:
      "lock.release",
    required:
      true,
    compensatable:
      false,
  },

  {
    id:
      "security-recovery.release",
    workflowId:
      "security-lock-recovery",
    order:
      2,
    type:
      "command" as const,
    name:
      "release-lock",
    domain:
      "locks",
    action:
      "lock.release",
    required:
      true,
    compensatable:
      true,
  },

  {
    id:
      "security-recovery.device",
    workflowId:
      "security-lock-recovery",
    order:
      3,
    type:
      "query" as const,
    name:
      "verify-device",
    domain:
      "devices",
    action:
      "device.refresh",
    required:
      true,
    compensatable:
      false,
  },

  {
    id:
      "device-reconciliation.policy",
    workflowId:
      "device-reconciliation-flow",
    order:
      1,
    type:
      "policy" as const,
    name:
      "device-reconciliation-policy",
    domain:
      "devices",
    action:
      "device.reconcile",
    required:
      true,
    compensatable:
      false,
  },

  {
    id:
      "device-reconciliation.command",
    workflowId:
      "device-reconciliation-flow",
    order:
      2,
    type:
      "command" as const,
    name:
      "reconcile-device",
    domain:
      "devices",
    action:
      "device.reconcile",
    required:
      true,
    compensatable:
      true,
  },
];

export function registerCanonicalWorkflowSteps(): void {
  for (
    const step of
      steps
  ) {
    registerWorkflowStep(
      step,
    );
  }
}

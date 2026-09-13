import {
  registerCompensationAction,
} from "./compensationRegistry";

const actions = [
  {
    id:
      "lease-lock.undo-secure",
    workflowId:
      "lease-lock-authorization",
    stepId:
      "lease-lock.secure",
    action:
      "lock.release",
    domain:
      "locks",
    reason:
      "Compensate a failed secure transition.",
    enabled:
      true,
  },

  {
    id:
      "security-recovery.undo-release",
    workflowId:
      "security-lock-recovery",
    stepId:
      "security-recovery.release",
    action:
      "lock.secure",
    domain:
      "locks",
    reason:
      "Compensate a failed release transition.",
    enabled:
      true,
  },

  {
    id:
      "lease-device.undo-reconcile",
    workflowId:
      "lease-device-binding",
    stepId:
      "lease-device.reconcile",
    action:
      "device.reconcile",
    domain:
      "devices",
    reason:
      "Reconcile device state after partial binding failure.",
    enabled:
      true,
  },

  {
    id:
      "payment.undo-reconciliation",
    workflowId:
      "lease-payment-reconciliation",
    stepId:
      "lease-payment.reconcile",
    action:
      "payment.refresh",
    domain:
      "payments",
    reason:
      "Re-read authoritative payment state after failed workflow completion.",
    enabled:
      true,
  },

  {
    id:
      "device.undo-reconciliation",
    workflowId:
      "device-reconciliation-flow",
    stepId:
      "device-reconciliation.command",
    action:
      "device.reconcile",
    domain:
      "devices",
    reason:
      "Repeat authoritative device reconciliation.",
    enabled:
      true,
  },
];

export function registerCanonicalCompensation(): void {
  for (
    const action of
      actions
  ) {
    registerCompensationAction(
      action,
    );
  }
}

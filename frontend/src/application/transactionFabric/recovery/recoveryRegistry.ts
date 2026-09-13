import type {
  RecoveryAction,
} from "../contracts/recoveryAction";

const actions = new Map<
  string,
  RecoveryAction
>();

export function registerRecoveryAction(
  action: RecoveryAction,
): void {
  actions.set(
    action.id,
    action,
  );
}

export function listRecoveryActions(): RecoveryAction[] {
  return [
    ...actions.values(),
  ];
}

export function listRecoveryForTransaction(
  transactionId: string,
): RecoveryAction[] {
  return listRecoveryActions().filter(
    (action) =>
      action.transactionId ===
      transactionId,
  );
}

export function registerCanonicalRecoveryActions(): void {
  const recovery: RecoveryAction[] = [
    {
      id:
        "recovery.payment-reconcile",
      transactionId:
        "txn.lease-payment",
      stepId:
        "lease-payment.reconcile",
      action:
        "payment.refresh",
      domain:
        "payments",
      strategy:
        "reconcile",
      enabled:
        true,
      reason:
        "Restore authoritative payment state.",
    },
    {
      id:
        "recovery.device-reconcile",
      transactionId:
        "txn.lease-device",
      stepId:
        "lease-device.reconcile",
      action:
        "device.reconcile",
      domain:
        "devices",
      strategy:
        "reconcile",
      enabled:
        true,
      reason:
        "Restore authoritative device state.",
    },
    {
      id:
        "recovery.lock-release",
      transactionId:
        "txn.lease-lock",
      stepId:
        "lease-lock.secure",
      action:
        "lock.release",
      domain:
        "locks",
      strategy:
        "compensate",
      enabled:
        true,
      reason:
        "Compensate partial physical-access transition.",
    },
    {
      id:
        "recovery.lock-secure",
      transactionId:
        "txn.security-recovery",
      stepId:
        "security-recovery.release",
      action:
        "lock.secure",
      domain:
        "locks",
      strategy:
        "compensate",
      enabled:
        true,
      reason:
        "Compensate failed protected recovery.",
    },
    {
      id:
        "recovery.device-repeat",
      transactionId:
        "txn.device-reconciliation",
      stepId:
        "device-reconciliation.command",
      action:
        "device.reconcile",
      domain:
        "devices",
      strategy:
        "retry",
      enabled:
        true,
      reason:
        "Retry transient device reconciliation.",
    },
  ];

  for (
    const action of
      recovery
  ) {
    registerRecoveryAction(
      action,
    );
  }
}

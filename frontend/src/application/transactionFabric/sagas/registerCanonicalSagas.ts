import {
  registerSaga,
} from "../registry/sagaRegistry";

const sagas = [
  {
    id:
      "saga.lease-payment",
    transactionId:
      "txn.lease-payment",
    name:
      "lease-payment",
    label:
      "Lease payment saga",
    description:
      "Recoverable lease/payment orchestration.",
    stepIds:
      [
        "lease-payment.authorize",
        "lease-payment.reconcile",
        "lease-payment.checkpoint",
      ],
    compensationIds:
      [
        "recovery.payment-reconcile",
      ],
    enabled:
      true,
  },

  {
    id:
      "saga.lease-device",
    transactionId:
      "txn.lease-device",
    name:
      "lease-device",
    label:
      "Lease device saga",
    description:
      "Recoverable lease/device binding.",
    stepIds:
      [
        "lease-device.authorize",
        "lease-device.reconcile",
        "lease-device.checkpoint",
      ],
    compensationIds:
      [
        "recovery.device-reconcile",
      ],
    enabled:
      true,
  },

  {
    id:
      "saga.lease-lock",
    transactionId:
      "txn.lease-lock",
    name:
      "lease-lock",
    label:
      "Lease lock saga",
    description:
      "Protected lease/device/lock orchestration.",
    stepIds:
      [
        "lease-lock.policy",
        "lease-lock.device",
        "lease-lock.secure",
        "lease-lock.checkpoint",
      ],
    compensationIds:
      [
        "recovery.lock-release",
      ],
    enabled:
      true,
  },

  {
    id:
      "saga.security-recovery",
    transactionId:
      "txn.security-recovery",
    name:
      "security-recovery",
    label:
      "Security recovery saga",
    description:
      "Controlled protected-state recovery.",
    stepIds:
      [
        "security-recovery.policy",
        "security-recovery.release",
        "security-recovery.verify",
        "security-recovery.checkpoint",
      ],
    compensationIds:
      [
        "recovery.lock-secure",
      ],
    enabled:
      true,
  },

  {
    id:
      "saga.device-reconciliation",
    transactionId:
      "txn.device-reconciliation",
    name:
      "device-reconciliation",
    label:
      "Device reconciliation saga",
    description:
      "Idempotent device recovery and reconciliation.",
    stepIds:
      [
        "device-reconciliation.policy",
        "device-reconciliation.command",
        "device-reconciliation.checkpoint",
      ],
    compensationIds:
      [
        "recovery.device-repeat",
      ],
    enabled:
      true,
  },
];

export function registerCanonicalSagas(): void {
  for (
    const saga of
      sagas
  ) {
    registerSaga(
      saga,
    );
  }
}

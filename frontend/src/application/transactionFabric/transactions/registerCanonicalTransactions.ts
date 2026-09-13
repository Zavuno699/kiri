import {
  registerTransaction,
} from "../registry/transactionRegistry";

const transactions = [
  {
    id:
      "txn.lease-payment",
    name:
      "lease-payment",
    label:
      "Lease payment transaction",
    description:
      "Coordinate lease and payment state consistently.",
    domains:
      [
        "leases",
        "payments",
      ],
    risk:
      "high" as const,
    transactional:
      true,
    idempotent:
      true,
    recoverable:
      true,
    enabled:
      true,
  },

  {
    id:
      "txn.lease-device",
    name:
      "lease-device",
    label:
      "Lease device transaction",
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
    idempotent:
      true,
    recoverable:
      true,
    enabled:
      true,
  },

  {
    id:
      "txn.lease-lock",
    name:
      "lease-lock",
    label:
      "Lease lock transaction",
    description:
      "Coordinate lease, device, lock, and security state.",
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
    idempotent:
      true,
    recoverable:
      true,
    enabled:
      true,
  },

  {
    id:
      "txn.security-recovery",
    name:
      "security-recovery",
    label:
      "Security recovery transaction",
    description:
      "Coordinate protected recovery and lock state reconciliation.",
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
    idempotent:
      true,
    recoverable:
      true,
    enabled:
      true,
  },

  {
    id:
      "txn.device-reconciliation",
    name:
      "device-reconciliation",
    label:
      "Device reconciliation transaction",
    description:
      "Coordinate device reconciliation and downstream state.",
    domains:
      [
        "devices",
        "locks",
      ],
    risk:
      "high" as const,
    transactional:
      true,
    idempotent:
      true,
    recoverable:
      true,
    enabled:
      true,
  },
];

export function registerCanonicalTransactions(): void {
  for (
    const transaction of
      transactions
  ) {
    registerTransaction(
      transaction,
    );
  }
}

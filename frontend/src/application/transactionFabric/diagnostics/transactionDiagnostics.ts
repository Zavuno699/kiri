import {
  listTransactions,
} from "../registry/transactionRegistry";

import {
  listSagas,
} from "../registry/sagaRegistry";

import {
  listTransactionStates,
} from "../state/transactionStateStore";

import {
  listCheckpoints,
} from "../checkpoints/checkpointStore";

import {
  listIdempotencyRecords,
} from "../idempotency/idempotencyStore";

import {
  listRecoveryActions,
} from "../recovery/recoveryRegistry";

export function getTransactionDiagnostics() {
  const states =
    listTransactionStates();

  return {
    transactionDefinitionCount:
      listTransactions().length,

    sagaCount:
      listSagas().length,

    activeCount:
      states.filter(
        (state) =>
          state.status ===
            "running" ||
          state.status ===
            "compensating",
      ).length,

    failedCount:
      states.filter(
        (state) =>
          state.status ===
            "failed" ||
          state.status ===
            "blocked",
      ).length,

    completedCount:
      states.filter(
        (state) =>
          state.status ===
          "completed",
      ).length,

    checkpointCount:
      listCheckpoints().length,

    idempotencyCount:
      listIdempotencyRecords().length,

    recoveryActionCount:
      listRecoveryActions().length,
  };
}

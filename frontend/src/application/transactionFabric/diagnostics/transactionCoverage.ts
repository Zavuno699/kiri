import {
  getTransactionDiagnostics,
} from "./transactionDiagnostics";

export function getTransactionCoverage() {
  const diagnostics =
    getTransactionDiagnostics();

  return {
    transactions:
      diagnostics.transactionDefinitionCount,

    sagas:
      diagnostics.sagaCount,

    checkpoints:
      diagnostics.checkpointCount,

    idempotency:
      diagnostics.idempotencyCount,

    recovery:
      diagnostics.recoveryActionCount,

    ready:
      diagnostics.transactionDefinitionCount >=
        4 &&
      diagnostics.sagaCount >=
        4 &&
      diagnostics.recoveryActionCount >=
        4,
  };
}

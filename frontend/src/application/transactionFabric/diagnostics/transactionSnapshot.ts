import {
  getTransactionDiagnostics,
} from "./transactionDiagnostics";

import {
  getTransactionCoverage,
} from "./transactionCoverage";

export function getTransactionSnapshot() {
  return {
    diagnostics:
      getTransactionDiagnostics(),
    coverage:
      getTransactionCoverage(),
    capturedAt:
      new Date().toISOString(),
  };
}

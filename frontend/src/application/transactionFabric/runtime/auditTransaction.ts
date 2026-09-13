import {
  recordStateAudit,
} from "../../observability/runtime/recordStateAudit";

import type {
  TransactionContext,
} from "../contracts/transactionContext";

import type {
  TransactionState,
} from "../contracts/transactionState";

export function auditTransaction(
  context: TransactionContext,
  state: TransactionState,
): string {
  return recordStateAudit({
    action:
      `transaction:${context.transactionId}`,
    domain:
      "global",
    entityId:
      context.entityId,
    correlationId:
      context.correlationId,
    outcome:
      state.status ===
        "completed"
        ? "success"
        : state.status ===
            "blocked"
          ? "blocked"
          : state.status ===
              "failed"
            ? "failed"
            : "observed",
    message:
      `Transaction status: ${state.status}.`,
  });
}

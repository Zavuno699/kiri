import {
  getTransactionState,
} from "../state/transactionStateStore";

import {
  listRecoveryForTransaction,
} from "./recoveryRegistry";

export function evaluateRecovery(
  transactionId: string,
): {
  decision: {
    transactionId: string;
    strategy:
      | "retry"
      | "compensate"
      | "reconcile"
      | "abort"
      | "manual";
    allowed: boolean;
    reasons: string[];
    evaluatedAt: string;
  };
  actions: ReturnType<
    typeof listRecoveryForTransaction
  >;
} {
  const state =
    getTransactionState(
      transactionId,
    );

  const actions =
    listRecoveryForTransaction(
      transactionId,
    );

  if (!state) {
    return {
      decision: {
        transactionId,
        strategy:
          "manual",
        allowed:
          false,
        reasons:
          [
            "Transaction state unavailable.",
          ],
        evaluatedAt:
          new Date().toISOString(),
      },
      actions,
    };
  }

  if (
    state.status ===
    "completed"
  ) {
    return {
      decision: {
        transactionId,
        strategy:
          "abort",
        allowed:
          false,
        reasons:
          [
            "Completed transactions do not require recovery.",
          ],
        evaluatedAt:
          new Date().toISOString(),
      },
      actions,
    };
  }

  const compensation =
    actions.find(
      (action) =>
        action.strategy ===
          "compensate" &&
        action.enabled,
    );

  const reconcile =
    actions.find(
      (action) =>
        action.strategy ===
          "reconcile" &&
        action.enabled,
    );

  const retry =
    actions.find(
      (action) =>
        action.strategy ===
          "retry" &&
        action.enabled,
    );

  const selected =
    compensation ??
    reconcile ??
    retry;

  if (!selected) {
    return {
      decision: {
        transactionId,
        strategy:
          "manual",
        allowed:
          false,
        reasons:
          [
            "No automatic recovery strategy is registered.",
          ],
        evaluatedAt:
          new Date().toISOString(),
      },
      actions,
    };
  }

  return {
    decision: {
      transactionId,
      strategy:
        selected.strategy,
      allowed:
        true,
      reasons:
        [
          selected.reason,
        ],
      evaluatedAt:
        new Date().toISOString(),
    },
    actions,
  };
}

import {
  evaluateRecovery,
} from "../recovery/evaluateRecovery";

import {
  updateTransactionState,
} from "../state/transactionStateStore";

export function recoverTransaction(
  transactionId: string,
) {
  const {
    decision,
    actions,
  } =
    evaluateRecovery(
      transactionId,
    );

  if (!decision.allowed) {
    updateTransactionState(
      transactionId,
      {
        status:
          "failed",
        error:
          decision.reasons.join(
            " | ",
          ),
      },
    );

    return {
      decision,
      actions,
      accepted:
        false,
    };
  }

  updateTransactionState(
    transactionId,
    {
      status:
        "compensating",
      error:
        null,
    },
  );

  return {
    decision,
    actions,
    accepted:
      true,
  };
}

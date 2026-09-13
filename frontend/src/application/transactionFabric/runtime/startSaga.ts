import {
  getSaga,
} from "../registry/sagaRegistry";

import {
  updateTransactionState,
} from "../state/transactionStateStore";

export function startSaga(
  transactionId: string,
  sagaId: string,
): {
  accepted: boolean;
  reason: string | null;
} {
  const saga =
    getSaga(
      sagaId,
    );

  if (!saga) {
    return {
      accepted:
        false,
      reason:
        "Saga not registered.",
    };
  }

  if (!saga.enabled) {
    return {
      accepted:
        false,
      reason:
        "Saga disabled.",
    };
  }

  updateTransactionState(
    transactionId,
    {
      status:
        "running",
      activeStepId:
        saga.stepIds[0] ??
        null,
      error:
        null,
    },
  );

  return {
    accepted:
      true,
      reason:
        null,
    };
}

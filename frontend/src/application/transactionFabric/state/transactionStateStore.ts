import type {
  TransactionState,
} from "../contracts/transactionState";

const states = new Map<
  string,
  TransactionState
>();

export function initializeTransactionState(
  transactionId: string,
): TransactionState {
  const existing =
    states.get(
      transactionId,
    );

  if (existing) {
    return existing;
  }

  const state: TransactionState = {
    transactionId,
    status:
      "created",
    activeStepId:
      null,
    completedStepIds:
      [],
    failedStepId:
      null,
    compensationStepIds:
      [],
    attempts:
      0,
    updatedAt:
      new Date().toISOString(),
    error:
      null,
  };

  states.set(
    transactionId,
    state,
  );

  return state;
}

export function getTransactionState(
  transactionId: string,
): TransactionState | null {
  return (
    states.get(
      transactionId,
    ) ??
    null
  );
}

export function updateTransactionState(
  transactionId: string,
  patch: Partial<TransactionState>,
): TransactionState {
  const current =
    initializeTransactionState(
      transactionId,
    );

  const next: TransactionState = {
    ...current,
    ...patch,
    updatedAt:
      new Date().toISOString(),
  };

  states.set(
    transactionId,
    next,
  );

  return next;
}

export function listTransactionStates(): TransactionState[] {
  return [
    ...states.values(),
  ];
}

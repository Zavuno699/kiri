import {
  getTransactionState,
} from "../state/transactionStateStore";

export function selectTransactionState(
  transactionId: string,
) {
  return getTransactionState(
    transactionId,
  );
}

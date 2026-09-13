import {
  listTransactionStates,
} from "../state/transactionStateStore";

export function selectTransactionStates(
  status?: string,
) {
  return listTransactionStates().filter(
    (state) =>
      !status ||
      state.status ===
        status,
  );
}

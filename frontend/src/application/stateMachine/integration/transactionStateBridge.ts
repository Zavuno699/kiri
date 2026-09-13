import {
  getTransactionState,
} from "../../transactionFabric/state/transactionStateStore";

import {
  updateEntityState,
} from "../state/entityStateStore";

export function bridgeTransactionToEntityState(
  transactionId: string,
  domain: string,
  entityId: string,
): boolean {
  const transaction =
    getTransactionState(
      transactionId,
    );

  if (!transaction) {
    return false;
  }

  if (
    transaction.status ===
    "completed"
  ) {
    updateEntityState(
      domain,
      entityId,
      "completed",
    );
  }

  if (
    transaction.status ===
      "failed" ||
    transaction.status ===
      "blocked"
  ) {
    updateEntityState(
      domain,
      entityId,
      "blocked",
    );
  }

  return true;
}

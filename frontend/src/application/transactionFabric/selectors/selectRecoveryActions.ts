import {
  listRecoveryForTransaction,
} from "../recovery/recoveryRegistry";

export function selectRecoveryActions(
  transactionId: string,
) {
  return listRecoveryForTransaction(
    transactionId,
  );
}

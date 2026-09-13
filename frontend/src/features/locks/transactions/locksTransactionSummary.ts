import {
  getLocksTransactions,
} from "../../../application/transactionFabric/adapters/locksTransactionAdapter";

export function getLocksTransactionSummary() {
  return getLocksTransactions();
}

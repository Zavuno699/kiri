import {
  listTransactionsByDomain,
} from "../registry/transactionRegistry";

export function getLocksTransactions() {
  return listTransactionsByDomain(
    "locks",
  );
}

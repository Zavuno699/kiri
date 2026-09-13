import {
  listTransactionsByDomain,
} from "../registry/transactionRegistry";

export function getDashboardTransactions() {
  return listTransactionsByDomain(
    "dashboard",
  );
}

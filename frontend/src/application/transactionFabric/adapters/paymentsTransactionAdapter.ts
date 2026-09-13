import {
  listTransactionsByDomain,
} from "../registry/transactionRegistry";

export function getPaymentsTransactions() {
  return listTransactionsByDomain(
    "payments",
  );
}

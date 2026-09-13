import {
  listTransactionsByDomain,
} from "../registry/transactionRegistry";

export function getSecurityTransactions() {
  return listTransactionsByDomain(
    "security",
  );
}

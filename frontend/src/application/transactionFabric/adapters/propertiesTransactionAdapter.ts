import {
  listTransactionsByDomain,
} from "../registry/transactionRegistry";

export function getPropertiesTransactions() {
  return listTransactionsByDomain(
    "properties",
  );
}

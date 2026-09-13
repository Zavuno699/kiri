import {
  listTransactionsByDomain,
} from "../registry/transactionRegistry";

export function getLeasesTransactions() {
  return listTransactionsByDomain(
    "leases",
  );
}

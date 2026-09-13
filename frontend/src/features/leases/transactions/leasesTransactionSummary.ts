import {
  getLeasesTransactions,
} from "../../../application/transactionFabric/adapters/leasesTransactionAdapter";

export function getLeasesTransactionSummary() {
  return getLeasesTransactions();
}

import {
  getDashboardTransactions,
} from "../../../application/transactionFabric/adapters/dashboardTransactionAdapter";

export function getDashboardTransactionSummary() {
  return getDashboardTransactions();
}

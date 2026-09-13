import {
  getPaymentsTransactions,
} from "../../../application/transactionFabric/adapters/paymentsTransactionAdapter";

export function getPaymentsTransactionSummary() {
  return getPaymentsTransactions();
}

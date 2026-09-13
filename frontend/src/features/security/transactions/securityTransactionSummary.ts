import {
  getSecurityTransactions,
} from "../../../application/transactionFabric/adapters/securityTransactionAdapter";

export function getSecurityTransactionSummary() {
  return getSecurityTransactions();
}

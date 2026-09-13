import {
  getPropertiesTransactions,
} from "../../../application/transactionFabric/adapters/propertiesTransactionAdapter";

export function getPropertiesTransactionSummary() {
  return getPropertiesTransactions();
}

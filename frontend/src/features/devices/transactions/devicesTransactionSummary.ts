import {
  getDevicesTransactions,
} from "../../../application/transactionFabric/adapters/devicesTransactionAdapter";

export function getDevicesTransactionSummary() {
  return getDevicesTransactions();
}

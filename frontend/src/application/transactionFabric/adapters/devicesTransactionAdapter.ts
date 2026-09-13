import {
  listTransactionsByDomain,
} from "../registry/transactionRegistry";

export function getDevicesTransactions() {
  return listTransactionsByDomain(
    "devices",
  );
}

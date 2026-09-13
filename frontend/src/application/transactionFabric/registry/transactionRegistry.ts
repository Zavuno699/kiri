import type {
  TransactionDefinition,
} from "../contracts/transactionDefinition";

const transactions = new Map<
  string,
  TransactionDefinition
>();

export function registerTransaction(
  transaction: TransactionDefinition,
): void {
  transactions.set(
    transaction.id,
    transaction,
  );
}

export function getTransaction(
  transactionId: string,
): TransactionDefinition | null {
  return (
    transactions.get(
      transactionId,
    ) ??
    null
  );
}

export function listTransactions(): TransactionDefinition[] {
  return [
    ...transactions.values(),
  ];
}

export function listTransactionsByDomain(
  domain: string,
): TransactionDefinition[] {
  return listTransactions().filter(
    (transaction) =>
      transaction.domains.includes(
        domain,
      ),
  );
}

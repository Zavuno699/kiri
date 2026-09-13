import type {
  PersistenceOperation,
} from "../contracts/persistenceOperation";

const operations: PersistenceOperation[] = [];

export function recordPersistenceOperation(
  operation: PersistenceOperation,
): void {
  operations.push(operation);

  if (operations.length > 250) {
    operations.shift();
  }
}

export function listPersistenceOperations(): PersistenceOperation[] {
  return [...operations];
}

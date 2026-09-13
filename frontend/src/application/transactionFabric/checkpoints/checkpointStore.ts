import type {
  TransactionCheckpoint,
} from "../contracts/checkpoint";

const checkpoints =
  new Map<
    string,
    TransactionCheckpoint
  >();

export function createCheckpoint(
  checkpoint: TransactionCheckpoint,
): void {
  checkpoints.set(
    checkpoint.id,
    checkpoint,
  );
}

export function getCheckpoint(
  id: string,
): TransactionCheckpoint | null {
  return (
    checkpoints.get(
      id,
    ) ??
    null
  );
}

export function listCheckpoints(
  transactionId?: string,
): TransactionCheckpoint[] {
  return [
    ...checkpoints.values(),
  ].filter(
    (checkpoint) =>
      !transactionId ||
      checkpoint.transactionId ===
        transactionId,
  );
}

export function commitCheckpoint(
  id: string,
): boolean {
  const checkpoint =
    checkpoints.get(
      id,
    );

  if (!checkpoint) {
    return false;
  }

  checkpoint.status =
    "committed";

  return true;
}

export function rollbackCheckpoint(
  id: string,
): boolean {
  const checkpoint =
    checkpoints.get(
      id,
    );

  if (!checkpoint) {
    return false;
  }

  checkpoint.status =
    "rolled-back";

  return true;
}

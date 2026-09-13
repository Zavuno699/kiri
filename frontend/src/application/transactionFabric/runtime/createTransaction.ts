import type {
  TransactionContext,
} from "../contracts/transactionContext";

import {
  getTransaction,
} from "../registry/transactionRegistry";

import {
  initializeTransactionState,
} from "../state/transactionStateStore";

import {
  reserveIdempotencyKey,
} from "../idempotency/idempotencyStore";

export function createTransaction(input: {
  transactionId: string;
  entityId: string | null;
  subjectId: string | null;
  parameters?: Record<
    string,
    unknown
  >;
}):
  | {
      accepted: true;
      context: TransactionContext;
    }
  | {
      accepted: false;
      reason: string;
    } {
  const definition =
    getTransaction(
      input.transactionId,
    );

  if (!definition) {
    return {
      accepted:
        false,
      reason:
        "Transaction not registered.",
    };
  }

  if (!definition.enabled) {
    return {
      accepted:
        false,
      reason:
        "Transaction disabled.",
    };
  }

  const transactionId =
    `${input.transactionId}:${crypto.randomUUID()}`;

  const correlationId =
    crypto.randomUUID();

  const idempotencyKey =
    `${input.transactionId}:${input.entityId ?? "global"}:${input.subjectId ?? "anonymous"}:${Date.now()}`;

  const reservation =
    reserveIdempotencyKey(
      idempotencyKey,
      transactionId,
      input.transactionId,
    );

  if (
    !reservation.accepted
  ) {
    return {
      accepted:
        false,
      reason:
        "Idempotency key already reserved.",
    };
  }

  initializeTransactionState(
    transactionId,
  );

  return {
    accepted:
      true,
    context: {
      transactionId,
      correlationId,
      entityId:
        input.entityId,
      subjectId:
        input.subjectId,
      idempotencyKey,
      createdAt:
        new Date().toISOString(),
      metadata:
        input.parameters ??
        {},
    },
  };
}

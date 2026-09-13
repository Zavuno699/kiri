export interface TransactionContext {
  transactionId: string;
  correlationId: string;
  entityId: string | null;
  subjectId: string | null;
  idempotencyKey: string;
  createdAt: string;
  metadata: Record<string, unknown>;
}

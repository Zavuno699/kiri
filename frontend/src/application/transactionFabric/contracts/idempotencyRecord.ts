export interface IdempotencyRecord<T = unknown> {
  key: string;
  transactionId: string;
  operation: string;
  status:
    | "reserved"
    | "in-progress"
    | "completed"
    | "failed";
  result: T | null;
  createdAt: string;
  updatedAt: string;
}

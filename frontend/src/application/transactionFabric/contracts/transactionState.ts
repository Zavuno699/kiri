export type TransactionStatus =
  | "created"
  | "authorized"
  | "running"
  | "blocked"
  | "failed"
  | "compensating"
  | "compensated"
  | "completed"
  | "unknown";

export interface TransactionState {
  transactionId: string;
  status: TransactionStatus;
  activeStepId: string | null;
  completedStepIds: string[];
  failedStepId: string | null;
  compensationStepIds: string[];
  attempts: number;
  updatedAt: string;
  error: string | null;
}

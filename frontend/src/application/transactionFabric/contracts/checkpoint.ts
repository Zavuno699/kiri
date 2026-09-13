export interface TransactionCheckpoint {
  id: string;
  transactionId: string;
  stepId: string;
  sequence: number;
  status:
    | "prepared"
    | "committed"
    | "rolled-back";
  stateHash: string;
  capturedAt: string;
  metadata: Record<string, unknown>;
}

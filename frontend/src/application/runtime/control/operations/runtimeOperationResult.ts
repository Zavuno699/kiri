export interface RuntimeOperationResult {
  operation: string;
  accepted: boolean;
  completed: boolean;
  reason: string | null;
  executedAt: string;
}

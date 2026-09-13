export type SagaStepStatus =
  | "pending"
  | "running"
  | "completed"
  | "failed"
  | "compensating"
  | "compensated"
  | "skipped";

export interface SagaStepState {
  stepId: string;
  status: SagaStepStatus;
  attempts: number;
  startedAt: string | null;
  completedAt: string | null;
  error: string | null;
  checkpointId: string | null;
}

export interface FlowResult<T = unknown> {
  flowId: string;
  success: boolean;
  data: T | null;
  completedSteps: string[];
  failedStep: string | null;
  error: string | null;
}

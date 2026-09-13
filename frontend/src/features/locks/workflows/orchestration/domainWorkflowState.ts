export interface LocksWorkflowState {
  activeWorkflowId: string | null;
  running: boolean;
  blocked: boolean;
  failed: boolean;
  reason: string | null;
}

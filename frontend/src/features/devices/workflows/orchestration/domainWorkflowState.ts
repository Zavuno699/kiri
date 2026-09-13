export interface DevicesWorkflowState {
  activeWorkflowId: string | null;
  running: boolean;
  blocked: boolean;
  failed: boolean;
  reason: string | null;
}

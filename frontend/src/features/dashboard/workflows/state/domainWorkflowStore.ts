import type {
  DashboardWorkflowState,
} from "../orchestration/domainWorkflowState";

let state: DashboardWorkflowState = {
  activeWorkflowId: null,
  running: false,
  blocked: false,
  failed: false,
  reason: null,
};

export function getDashboardWorkflowState(): DashboardWorkflowState {
  return state;
}

export function setDashboardWorkflowState(
  next: DashboardWorkflowState,
): void {
  state = next;
}

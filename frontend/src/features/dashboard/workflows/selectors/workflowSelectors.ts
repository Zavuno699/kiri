import type {
  DashboardWorkflowState,
} from "../orchestration/domainWorkflowState";

export const selectDashboardWorkflowRunning = (
  state: DashboardWorkflowState,
) => state.running;

export const selectDashboardWorkflowBlocked = (
  state: DashboardWorkflowState,
) => state.blocked;

export const selectDashboardWorkflowFailed = (
  state: DashboardWorkflowState,
) => state.failed;

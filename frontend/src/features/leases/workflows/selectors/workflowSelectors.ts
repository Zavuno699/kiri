import type {
  LeasesWorkflowState,
} from "../orchestration/domainWorkflowState";

export const selectLeasesWorkflowRunning = (
  state: LeasesWorkflowState,
) => state.running;

export const selectLeasesWorkflowBlocked = (
  state: LeasesWorkflowState,
) => state.blocked;

export const selectLeasesWorkflowFailed = (
  state: LeasesWorkflowState,
) => state.failed;

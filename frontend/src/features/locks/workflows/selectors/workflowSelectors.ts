import type {
  LocksWorkflowState,
} from "../orchestration/domainWorkflowState";

export const selectLocksWorkflowRunning = (
  state: LocksWorkflowState,
) => state.running;

export const selectLocksWorkflowBlocked = (
  state: LocksWorkflowState,
) => state.blocked;

export const selectLocksWorkflowFailed = (
  state: LocksWorkflowState,
) => state.failed;

import type {
  SecurityWorkflowState,
} from "../orchestration/domainWorkflowState";

export const selectSecurityWorkflowRunning = (
  state: SecurityWorkflowState,
) => state.running;

export const selectSecurityWorkflowBlocked = (
  state: SecurityWorkflowState,
) => state.blocked;

export const selectSecurityWorkflowFailed = (
  state: SecurityWorkflowState,
) => state.failed;

import type {
  PaymentsWorkflowState,
} from "../orchestration/domainWorkflowState";

export const selectPaymentsWorkflowRunning = (
  state: PaymentsWorkflowState,
) => state.running;

export const selectPaymentsWorkflowBlocked = (
  state: PaymentsWorkflowState,
) => state.blocked;

export const selectPaymentsWorkflowFailed = (
  state: PaymentsWorkflowState,
) => state.failed;

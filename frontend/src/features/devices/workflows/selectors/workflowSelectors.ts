import type {
  DevicesWorkflowState,
} from "../orchestration/domainWorkflowState";

export const selectDevicesWorkflowRunning = (
  state: DevicesWorkflowState,
) => state.running;

export const selectDevicesWorkflowBlocked = (
  state: DevicesWorkflowState,
) => state.blocked;

export const selectDevicesWorkflowFailed = (
  state: DevicesWorkflowState,
) => state.failed;

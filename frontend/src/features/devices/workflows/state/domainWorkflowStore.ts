import type {
  DevicesWorkflowState,
} from "../orchestration/domainWorkflowState";

let state: DevicesWorkflowState = {
  activeWorkflowId: null,
  running: false,
  blocked: false,
  failed: false,
  reason: null,
};

export function getDevicesWorkflowState(): DevicesWorkflowState {
  return state;
}

export function setDevicesWorkflowState(
  next: DevicesWorkflowState,
): void {
  state = next;
}

import type {
  LocksWorkflowState,
} from "../orchestration/domainWorkflowState";

let state: LocksWorkflowState = {
  activeWorkflowId: null,
  running: false,
  blocked: false,
  failed: false,
  reason: null,
};

export function getLocksWorkflowState(): LocksWorkflowState {
  return state;
}

export function setLocksWorkflowState(
  next: LocksWorkflowState,
): void {
  state = next;
}

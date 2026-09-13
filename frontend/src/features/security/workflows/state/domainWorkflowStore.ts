import type {
  SecurityWorkflowState,
} from "../orchestration/domainWorkflowState";

let state: SecurityWorkflowState = {
  activeWorkflowId: null,
  running: false,
  blocked: false,
  failed: false,
  reason: null,
};

export function getSecurityWorkflowState(): SecurityWorkflowState {
  return state;
}

export function setSecurityWorkflowState(
  next: SecurityWorkflowState,
): void {
  state = next;
}

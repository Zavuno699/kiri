import type {
  PropertiesWorkflowState,
} from "../orchestration/domainWorkflowState";

let state: PropertiesWorkflowState = {
  activeWorkflowId: null,
  running: false,
  blocked: false,
  failed: false,
  reason: null,
};

export function getPropertiesWorkflowState(): PropertiesWorkflowState {
  return state;
}

export function setPropertiesWorkflowState(
  next: PropertiesWorkflowState,
): void {
  state = next;
}

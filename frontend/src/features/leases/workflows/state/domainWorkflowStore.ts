import type {
  LeasesWorkflowState,
} from "../orchestration/domainWorkflowState";

let state: LeasesWorkflowState = {
  activeWorkflowId: null,
  running: false,
  blocked: false,
  failed: false,
  reason: null,
};

export function getLeasesWorkflowState(): LeasesWorkflowState {
  return state;
}

export function setLeasesWorkflowState(
  next: LeasesWorkflowState,
): void {
  state = next;
}

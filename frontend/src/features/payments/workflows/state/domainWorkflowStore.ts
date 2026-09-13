import type {
  PaymentsWorkflowState,
} from "../orchestration/domainWorkflowState";

let state: PaymentsWorkflowState = {
  activeWorkflowId: null,
  running: false,
  blocked: false,
  failed: false,
  reason: null,
};

export function getPaymentsWorkflowState(): PaymentsWorkflowState {
  return state;
}

export function setPaymentsWorkflowState(
  next: PaymentsWorkflowState,
): void {
  state = next;
}

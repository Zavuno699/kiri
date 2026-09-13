import type {
  WorkflowState,
} from "./workflowState";

let state: WorkflowState = {
  initialized: false,
  definitions: [],
  executions: [],
  activeWorkflowId: null,
};

export function getWorkflowState(): WorkflowState {
  return state;
}

export function setWorkflowState(
  next: WorkflowState,
): void {
  state = next;
}

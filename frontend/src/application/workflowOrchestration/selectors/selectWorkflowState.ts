import {
  getWorkflowExecutionState,
} from "../state/workflowExecutionStore";

export function selectWorkflowState() {
  return getWorkflowExecutionState();
}

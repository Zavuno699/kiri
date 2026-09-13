import {
  getLocksWorkflows,
} from "../../../application/workflowOrchestration/adapters/locksWorkflowAdapter";

export function getLocksWorkflowSummary() {
  return getLocksWorkflows();
}

import {
  getSecurityWorkflows,
} from "../../../application/workflowOrchestration/adapters/securityWorkflowAdapter";

export function getSecurityWorkflowSummary() {
  return getSecurityWorkflows();
}

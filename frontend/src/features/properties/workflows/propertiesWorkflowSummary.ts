import {
  getPropertiesWorkflows,
} from "../../../application/workflowOrchestration/adapters/propertiesWorkflowAdapter";

export function getPropertiesWorkflowSummary() {
  return getPropertiesWorkflows();
}

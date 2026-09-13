import {
  getDevicesWorkflows,
} from "../../../application/workflowOrchestration/adapters/devicesWorkflowAdapter";

export function getDevicesWorkflowSummary() {
  return getDevicesWorkflows();
}

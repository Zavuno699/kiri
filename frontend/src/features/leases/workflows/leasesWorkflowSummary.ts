import {
  getLeasesWorkflows,
} from "../../../application/workflowOrchestration/adapters/leasesWorkflowAdapter";

export function getLeasesWorkflowSummary() {
  return getLeasesWorkflows();
}

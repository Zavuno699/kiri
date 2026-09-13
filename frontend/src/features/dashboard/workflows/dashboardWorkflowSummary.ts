import {
  getDashboardWorkflows,
} from "../../../application/workflowOrchestration/adapters/dashboardWorkflowAdapter";

export function getDashboardWorkflowSummary() {
  return getDashboardWorkflows();
}

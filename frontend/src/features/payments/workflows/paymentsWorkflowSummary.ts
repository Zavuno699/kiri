import {
  getPaymentsWorkflows,
} from "../../../application/workflowOrchestration/adapters/paymentsWorkflowAdapter";

export function getPaymentsWorkflowSummary() {
  return getPaymentsWorkflows();
}

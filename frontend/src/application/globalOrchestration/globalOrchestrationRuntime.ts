import {
  refreshFrontendHealth,
} from "../frontendHealth/frontendHealthRuntime";

import {
  refreshGlobalOperatorControl,
} from "../operatorControl/runtime/operatorControlRuntime";

import {
  initializeWorkflowOrchestration,
} from "../workflowOrchestration/runtime/workflowRuntime";

export function initializeGlobalOrchestration(): void {
  initializeWorkflowOrchestration();
  refreshFrontendHealth();
  refreshGlobalOperatorControl();
}

export function refreshGlobalOrchestration(): void {
  refreshFrontendHealth();
  refreshGlobalOperatorControl();
}

import {
  getGlobalOperatorControlState,
} from "../operatorControl/state/globalOperatorControlStore";

import {
  getWorkflowState,
} from "../workflowOrchestration/state/workflowStore";

import {
  getConsistencyState,
} from "../consistency/state/consistencyStore";

import {
  getDegradedModeState,
} from "../degradedMode/state/degradedModeStore";

import {
  getDomainHealthState,
} from "../domainHealth/state/domainHealthStore";

export function getGlobalOrchestrationSnapshot() {
  return {
    operator:
      getGlobalOperatorControlState(),
    workflows:
      getWorkflowState(),
    consistency:
      getConsistencyState(),
    degradedMode:
      getDegradedModeState(),
    domainHealth:
      getDomainHealthState(),
  };
}

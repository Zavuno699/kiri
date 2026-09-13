import {
  getUnifiedRuntimeState,
} from "../unifiedRuntime/state/unifiedRuntimeStore";

import {
  getGlobalOperatorControlState,
} from "../operatorControl/state/globalOperatorControlStore";

import {
  getConsistencyState,
} from "../consistency/state/consistencyStore";

import {
  getDomainHealthState,
} from "../domainHealth/state/domainHealthStore";

import {
  getDegradedModeState,
} from "../degradedMode/state/degradedModeStore";

import {
  getWorkflowState,
} from "../workflowOrchestration/state/workflowStore";

import {
  setUnifiedOperationalState,
} from "./operationalStateStore";

export function rebuildUnifiedOperationalState(): void {
  setUnifiedOperationalState({
    runtime:
      getUnifiedRuntimeState(),
    operator:
      getGlobalOperatorControlState(),
    consistency:
      getConsistencyState(),
    health:
      getDomainHealthState(),
    degradedMode:
      getDegradedModeState(),
    workflows:
      getWorkflowState(),
  });
}

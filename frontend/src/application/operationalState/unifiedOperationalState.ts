import type {
  UnifiedRuntimeState,
} from "../unifiedRuntime/state/unifiedRuntimeState";

import type {
  GlobalOperatorControlState,
} from "../operatorControl/state/globalOperatorControlState";

import type {
  ConsistencyState,
} from "../consistency/state/consistencyState";

import type {
  DomainHealthState,
} from "../domainHealth/state/domainHealthState";

import type {
  DegradedModeState,
} from "../degradedMode/state/degradedModeState";

import type {
  WorkflowState,
} from "../workflowOrchestration/state/workflowState";

export interface UnifiedOperationalState {
  runtime: UnifiedRuntimeState;
  operator: GlobalOperatorControlState;
  consistency: ConsistencyState;
  health: DomainHealthState;
  degradedMode: DegradedModeState;
  workflows: WorkflowState;
}

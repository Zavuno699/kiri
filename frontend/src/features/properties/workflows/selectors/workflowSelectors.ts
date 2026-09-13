import type {
  PropertiesWorkflowState,
} from "../orchestration/domainWorkflowState";

export const selectPropertiesWorkflowRunning = (
  state: PropertiesWorkflowState,
) => state.running;

export const selectPropertiesWorkflowBlocked = (
  state: PropertiesWorkflowState,
) => state.blocked;

export const selectPropertiesWorkflowFailed = (
  state: PropertiesWorkflowState,
) => state.failed;

import {
  getWorkflowExecutionState,
} from "../../workflowOrchestration/state/workflowExecutionStore";

import {
  updateEntityState,
} from "../state/entityStateStore";

export function bridgeWorkflowToEntityState(
  domain: string,
  entityId: string,
): boolean {
  const workflow =
    getWorkflowExecutionState();

  if (
    workflow.activeWorkflowId ===
    null
  ) {
    return false;
  }

  if (
    workflow.outcome ===
    "completed"
  ) {
    updateEntityState(
      domain,
      entityId,
      "workflow.completed",
    );
  }

  if (
    workflow.outcome ===
      "failed" ||
    workflow.outcome ===
      "blocked"
  ) {
    updateEntityState(
      domain,
      entityId,
      "workflow.blocked",
    );
  }

  return true;
}

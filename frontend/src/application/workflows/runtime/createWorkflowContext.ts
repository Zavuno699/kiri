import {
  createDispatchContext,
} from "../../busRuntime/runtime/createDispatchContext";

import type {
  WorkflowContext,
} from "../contracts/workflowContext";

export function createWorkflowContext(
  workflowId: string,
): WorkflowContext {
  const dispatch =
    createDispatchContext();

  return {
    workflowId,
    correlationId:
      dispatch.correlationId,
    causationId:
      dispatch.causationId,
    startedAt:
      new Date().toISOString(),
  };
}

import {
  validateTransition,
} from "./validateTransition";

import type {
  TransitionRequest,
} from "../contracts/transitionRequest";

export function previewTransition(
  request: TransitionRequest,
) {
  const validation =
    validateTransition(
      request,
    );

  return {
    transitionId:
      request.transitionId,
    entityId:
      request.entityId,
    currentState:
      request.currentState,
    targetState:
      validation.transition
        ?.toState ??
      null,
    valid:
      validation.valid,
    guardIds:
      validation.guardIds,
    invariantIds:
      validation.invariantIds,
    reasons:
      validation.reasons,
  };
}

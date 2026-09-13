import type {
  TransitionRequest,
} from "../contracts/transitionRequest";

import type {
  TransitionResult,
} from "../contracts/transitionResult";

import {
  validateTransition,
} from "./validateTransition";

import {
  getEntityState,
  initializeEntityState,
  updateEntityState,
} from "../state/entityStateStore";

import {
  appendTransitionHistory,
} from "../history/transitionHistoryStore";

import {
  setStateMachineRuntime,
} from "../state/stateMachineRuntimeStore";

export function executeTransition(
  request: TransitionRequest,
): TransitionResult {
  const current =
    getEntityState(
      request.domain,
      request.entityId,
    ) ??
    initializeEntityState(
      request.domain,
      request.entityId,
      request.currentState,
      request.context,
    );

  const validation =
    validateTransition({
      ...request,
      currentState:
        current.state,
    });

  if (
    !validation.valid ||
    !validation.transition
  ) {
    const result: TransitionResult = {
      transitionId:
        request.transitionId,
      entityId:
        request.entityId,
      fromState:
        current.state,
      toState:
        validation.transition
          ?.toState ??
        null,
      outcome:
        "blocked",
      allowed:
        false,
      reasons:
        validation.reasons,
      invariantIds:
        validation.invariantIds,
      guardIds:
        validation.guardIds,
      correlationId:
        request.correlationId,
    };

    appendTransitionHistory({
      id:
        `transition-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      transitionId:
        request.transitionId,
      entityId:
        request.entityId,
      domain:
        request.domain,
      fromState:
        current.state,
      toState:
        validation.transition
          ?.toState ??
        null,
      outcome:
        "blocked",
      correlationId:
        request.correlationId,
      occurredAt:
        new Date().toISOString(),
      reasons:
        validation.reasons,
    });

    setStateMachineRuntime({
      lastResult:
        result,
      active:
        false,
    });

    return result;
  }

  const updated =
    updateEntityState(
      request.domain,
      request.entityId,
      validation.transition
        .toState,
      request.context,
    );

  const result: TransitionResult = {
    transitionId:
      request.transitionId,
    entityId:
      request.entityId,
    fromState:
      current.state,
    toState:
      updated.state,
    outcome:
      "completed",
    allowed:
      true,
    reasons:
      [],
    invariantIds:
      validation.invariantIds,
    guardIds:
      validation.guardIds,
    correlationId:
      request.correlationId,
  };

  appendTransitionHistory({
    id:
      `transition-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    transitionId:
      request.transitionId,
    entityId:
      request.entityId,
    domain:
      request.domain,
    fromState:
      current.state,
    toState:
      updated.state,
    outcome:
      "completed",
    correlationId:
      request.correlationId,
    occurredAt:
      new Date().toISOString(),
    reasons:
      [],
  });

  setStateMachineRuntime({
    lastResult:
      result,
    active:
      false,
  });

  return result;
}

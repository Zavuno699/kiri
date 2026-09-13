import type {
  TransitionRequest,
} from "../contracts/transitionRequest";

import {
  getTransition,
} from "../registry/transitionRegistry";

import {
  listGuardsByDomain,
} from "../guards/guardRegistry";

import {
  listInvariantsByDomain,
} from "../invariants/invariantRegistry";

export function validateTransition(
  request: TransitionRequest,
) {
  const transition =
    getTransition(
      request.transitionId,
    );

  if (!transition) {
    return {
      valid:
        false,
      transition:
        null,
      guardIds:
        [],
      invariantIds:
        [],
      reasons:
        [
          "Transition not registered.",
        ],
    };
  }

  if (!transition.enabled) {
    return {
      valid:
        false,
      transition,
      guardIds:
        [],
      invariantIds:
        [],
      reasons:
        [
          "Transition disabled.",
        ],
    };
  }

  if (
    !transition.fromStates.includes(
      request.currentState,
    )
  ) {
    return {
      valid:
        false,
      transition,
      guardIds:
        [],
      invariantIds:
        [],
      reasons:
        [
          `Transition is not legal from state ${request.currentState}.`,
        ],
    };
  }

  const guards =
    transition.guarded
      ? listGuardsByDomain(
          request.domain,
        )
      : [];

  const invariants =
    listInvariantsByDomain(
      request.domain,
    );

  const reasons: string[] =
    [];

  for (
    const guard of
      guards
  ) {
    const result =
      guard.evaluate({
        domain:
          request.domain,
        entityId:
          request.entityId,
        fromState:
          request.currentState,
        toState:
          transition.toState,
        action:
          transition.action,
        context:
          request.context,
      });

    if (
      result !==
      "pass"
    ) {
      reasons.push(
        `${guard.label}: ${result}`,
      );
    }
  }

  for (
    const invariant of
      invariants
  ) {
    const result =
      invariant.validate({
        domain:
          request.domain,
        entityId:
          request.entityId,
        state:
          transition.toState,
        context:
          request.context,
      });

    if (
      result ===
      "fail"
    ) {
      reasons.push(
        `${invariant.label}: fail`,
      );
    }

    if (
      result ===
      "unknown"
    ) {
      reasons.push(
        `${invariant.label}: unknown`,
      );
    }
  }

  if (
    request.domain ===
      "security" &&
    !request.confirmed
  ) {
    reasons.push(
      "Security lifecycle transition requires confirmation.",
    );
  }

  return {
    valid:
      reasons.length ===
      0,
    transition,
    guardIds:
      guards.map(
        (guard) =>
          guard.id,
      ),
    invariantIds:
      invariants.map(
        (invariant) =>
          invariant.id,
      ),
    reasons,
  };
}

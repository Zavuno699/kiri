import type {
  PolicyRequest,
} from "../contracts/policyRequest";

import type {
  PolicyDecision,
} from "../contracts/policyDecision";

import {
  assessActionRisk,
} from "../risk/assessActionRisk";

import {
  evaluateAuthorization,
} from "../authorization/evaluateAuthorization";

import {
  evaluatePolicies,
} from "../policies/evaluatePolicies";

import {
  evaluateGuards,
} from "../guards/evaluateGuards";

import {
  appendDecision,
} from "../decisions/decisionStore";

import {
  setPolicyState,
} from "../state/policyStateStore";

export function evaluatePolicyDecision(
  request: PolicyRequest,
): PolicyDecision {
  setPolicyState({
    loading:
      true,
    error:
      null,
  });

  const authorization =
    evaluateAuthorization(
      request.authorization,
      request.domain,
      request.action,
    );

  const policy =
    evaluatePolicies(
      request.domain,
      request.action,
    );

  const risk =
    assessActionRisk(
      request.action,
      request.domain,
      request.confirmed,
    );

  const guards =
    evaluateGuards(
      request.domain,
      request.action,
      {
        entityId:
          request.entityId,
        domain:
          request.domain,
        action:
          request.action,
        state:
          request.state,
      },
    );

  const reasons = [
    ...authorization.reasons,
    ...policy.reasons,
  ];

  if (
    risk.requiresConfirmation &&
    !request.confirmed
  ) {
    reasons.push(
      "Explicit confirmation required by risk policy.",
    );
  }

  if (
    risk.requiresElevation &&
    !request.authorization
      .elevated
  ) {
    reasons.push(
      "Elevated authorization required for critical-risk action.",
    );
  }

  if (
    guards.status !==
    "pass"
  ) {
    reasons.push(
      ...guards.reasons.map(
        (reason) =>
          `State guard: ${reason}`,
      ),
    );
  }

  let outcome:
    | "allow"
    | "deny"
    | "conditional"
    | "blocked";

  if (
    authorization.status ===
      "fail" ||
    policy.status ===
      "fail"
  ) {
    outcome =
      "deny";
  } else if (
    guards.status ===
      "fail" ||
    (
      risk.requiresElevation &&
      !request.authorization
        .elevated
    )
  ) {
    outcome =
      "blocked";
  } else if (
    risk.requiresConfirmation &&
    !request.confirmed
  ) {
    outcome =
      "conditional";
  } else if (
    guards.status ===
    "unknown"
  ) {
    outcome =
      "blocked";
  } else {
    outcome =
      "allow";
  }

  const decision: PolicyDecision = {
    id:
      `decision-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,

    action:
      request.action,

    domain:
      request.domain,

    entityId:
      request.entityId,

    outcome,

    allowed:
      outcome ===
      "allow",

    reasons,

    policyIds:
      policy.policyIds,

    guardIds:
      guards.guardIds,

    risk,

    evaluatedAt:
      new Date().toISOString(),

    correlationId:
      null,
  };

  appendDecision(
    decision,
  );

  setPolicyState({
    lastDecisionId:
      decision.id,
    lastOutcome:
      decision.outcome,
    decisionIds: [
      decision.id,
    ],
    loading:
      false,
    error:
      null,
  });

  return decision;
}

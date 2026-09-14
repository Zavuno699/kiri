import {
  getAuthenticationState,
} from "../../authentication/state/authenticationStore";

import {
  getRBACState,
} from "../../rbac/state/rbacStore";

import {
  getConsistencyState,
} from "../../consistency/state/consistencyStore";

import {
  getDomainHealthState,
} from "../../domainHealth/state/domainHealthStore";

import {
  getDegradedModeState,
} from "../../degradedMode/state/degradedModeStore";

import {
  getOperatorNavigationState,
} from "../../operatorNavigation/state/navigationStore";

import {
  getOperatorActionState,
} from "../../operatorActions/state/actionStore";

import {
  getSecurityRuntimeReadiness,
} from "../../security/runtime/runtimeReadiness";

export interface OperatorReadinessDecision {
  ready: boolean;
  reasons: string[];
}

export function evaluateOperatorReadiness(): OperatorReadinessDecision {
  const reasons: string[] = [];

  const authentication =
    getAuthenticationState();

  const rbac =
    getRBACState();

  const consistency =
    getConsistencyState();

  const domains =
    getDomainHealthState();

  const degraded =
    getDegradedModeState();

  const navigation =
    getOperatorNavigationState();

  const actions =
    getOperatorActionState();

  if (authentication.status !== "authenticated") {
    reasons.push("operator-not-authenticated");
  }

  if (!rbac.initialized) {
    reasons.push("rbac-not-ready");
  }

  if (!getSecurityRuntimeReadiness().authorizationReady) {
    reasons.push("security-runtime-not-ready");
  }

  if (!consistency.initialized) {
    reasons.push("consistency-not-ready");
  }

  if (!domains.initialized) {
    reasons.push("domain-health-not-ready");
  }

  if (!navigation.initialized) {
    reasons.push("navigation-not-ready");
  }

  if (!actions.initialized) {
    reasons.push("action-plane-not-ready");
  }

  if (degraded.active) {
    reasons.push("critical-degraded-mode");
  }

  return {
    ready: reasons.length === 0,
    reasons,
  };
}

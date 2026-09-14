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

import {
  setGlobalOperatorControlState,
} from "../state/globalOperatorControlStore";

import {
  evaluateOperatorReadiness,
} from "../decisions/evaluateOperatorReadiness";

export function refreshGlobalOperatorControl(): void {
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

  const readiness =
    evaluateOperatorReadiness();

  setGlobalOperatorControlState({
    initialized: true,
    authenticated:
      authentication.status === "authenticated",
    sessionActive:
      authentication.sessionId !== null,
    rbacReady:
      rbac.initialized,
    navigationReady:
      navigation.initialized,
    actionPlaneReady:
      actions.initialized,
    securityReady:
      getSecurityRuntimeReadiness().authorizationReady,
    consistencyReady:
      consistency.initialized,
    degradedMode:
      degraded.active ? "restricted" : "normal",
    domainHealthScore:
      domains.score,
    consistencyScore:
      consistency.snapshot?.score ?? 0,
    operatorReady:
      readiness.ready,
    reasons:
      readiness.reasons,
  });
}

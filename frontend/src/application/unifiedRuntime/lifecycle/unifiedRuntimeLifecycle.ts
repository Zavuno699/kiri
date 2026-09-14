import {
  getAuthenticationState,
} from "../../authentication/state/authenticationStore";

import {
  getRBACState,
} from "../../rbac/state/rbacStore";

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
  getConsistencyState,
} from "../../consistency/state/consistencyStore";

import {
  getDomainHealthState,
} from "../../domainHealth/state/domainHealthStore";

import {
  getDegradedModeState,
} from "../../degradedMode/state/degradedModeStore";

import {
  getWorkflowState,
} from "../../workflowOrchestration/state/workflowStore";

import {
  getUnifiedRuntimeState,
  setUnifiedRuntimeState,
} from "../state/unifiedRuntimeStore";

export function initializeUnifiedRuntimeLifecycle(): void {
  const authentication =
    getAuthenticationState();

  const rbac =
    getRBACState();

  const navigation =
    getOperatorNavigationState();

  const actions =
    getOperatorActionState();

  const consistency =
    getConsistencyState();

  const health =
    getDomainHealthState();

  const degraded =
    getDegradedModeState();

  const workflows =
    getWorkflowState();

  const securityReady =
    getSecurityRuntimeReadiness().authorizationReady;

  const authenticationReady =
    authentication.status === "authenticated";

  const consistencyReady =
    consistency.initialized;

  const healthReady =
    health.initialized;

  const orchestrationReady =
    workflows.initialized;

  const operatorReady =
    authenticationReady &&
    securityReady &&
    rbac.initialized &&
    navigation.initialized &&
    actions.initialized &&
    consistencyReady &&
    healthReady &&
    orchestrationReady &&
    degraded.active;

  const reasons: string[] = [];

  if (!authenticationReady) {
    reasons.push("authentication-not-ready");
  }

  if (!securityReady) {
    reasons.push("security-not-ready");
  }

  if (!rbac.initialized) {
    reasons.push("rbac-not-ready");
  }

  if (!navigation.initialized) {
    reasons.push("navigation-not-ready");
  }

  if (!actions.initialized) {
    reasons.push("action-plane-not-ready");
  }

  if (!consistencyReady) {
    reasons.push("consistency-not-ready");
  }

  if (!healthReady) {
    reasons.push("domain-health-not-ready");
  }

  if (!orchestrationReady) {
    reasons.push("orchestration-not-ready");
  }

  if (degraded.active) {
    reasons.push("critical-degraded-mode");
  }

  setUnifiedRuntimeState({
    initialized: true,
    status:
      operatorReady
        ? "ready"
        : degraded.active
          ? "restricted"
          : reasons.length > 0
            ? "limited"
            : "starting",
    authenticationReady,
    securityReady,
    rbacReady: rbac.initialized,
    navigationReady: navigation.initialized,
    actionPlaneReady: actions.initialized,
    consistencyReady,
    healthReady,
    orchestrationReady,
    degradedMode: degraded.active ? "restricted" : "normal",
    consistencyScore:
      consistency.snapshot?.score ?? 0,
    domainHealthScore:
      health.score,
    operatorReady,
    startedAt:
      getUnifiedRuntimeState().startedAt ??
      new Date().toISOString(),
    lastRefreshAt:
      new Date().toISOString(),
    reasons,
  });
}

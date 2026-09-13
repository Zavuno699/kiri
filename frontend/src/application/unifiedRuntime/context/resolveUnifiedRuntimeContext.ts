import {
  getAuthenticationState,
} from "../../authentication/state/authenticationStore";

import {
  getRBACState,
} from "../../rbac/state/rbacStore";

import {
  getDegradedModeState,
} from "../../degradedMode/state/degradedModeStore";

import {
  getConsistencyState,
} from "../../consistency/state/consistencyStore";

import {
  getDomainHealthState,
} from "../../domainHealth/state/domainHealthStore";

import {
  getAuditCorrelationContext,
} from "../../audit/correlation/correlationContext";

import type {
  UnifiedRuntimeContext,
} from "./unifiedRuntimeContext";

export function resolveUnifiedRuntimeContext(): UnifiedRuntimeContext {
  const authentication =
    getAuthenticationState();

  const rbac =
    getRBACState();

  const degraded =
    getDegradedModeState();

  const consistency =
    getConsistencyState();

  const health =
    getDomainHealthState();

  const correlation =
    getAuditCorrelationContext();

  return {
    principal:
      authentication.principal,
    sessionId:
      authentication.sessionId,
    roles:
      rbac.roles.map(String),
    capabilities:
      rbac.effectiveCapabilities,
    degradedMode:
      degraded.mode,
    consistencyScore:
      consistency.snapshot?.score ?? 0,
    domainHealthScore:
      health.score,
    correlationId:
      correlation.correlationId,
  };
}

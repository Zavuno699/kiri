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
  getAuditCorrelationContext,
} from "../../audit/correlation/correlationContext";

import type {
  GlobalOperatorContext,
} from "./globalOperatorContext";

export function resolveGlobalOperatorContext(
  currentPath?: string | null,
): GlobalOperatorContext {
  const authentication =
    getAuthenticationState();

  const rbac = getRBACState();

  const degraded =
    getDegradedModeState();

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
    currentPath:
      currentPath ?? null,
    correlationId:
      correlation.correlationId,
  };
}

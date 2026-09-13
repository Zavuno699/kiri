import {
  getSecurityMode,
} from "../state/securityModeStore";

import {
  getSecurityFreezeState,
} from "../state/securityFreezeStore";

import {
  getSecurityPrincipal,
} from "../state/securityPrincipalStore";

import {
  isSecuritySessionActive,
} from "../session/isSessionActive";

import {
  getSecurityPolicy,
} from "../registry/policyRegistry";

import type {
  AuthorizationDecision,
} from "../contracts/securityDecision";

export function evaluateAuthorization(
  capability: string,
): AuthorizationDecision {
  const now =
    new Date().toISOString();

  const policy =
    getSecurityPolicy(
      capability,
    );

  const principal =
    getSecurityPrincipal();

  if (!policy) {
    return {
      decision: "deny",
      capability,
      principal:
        principal?.id ?? null,
      reason:
        "capability-not-registered",
      evaluatedAt: now,
    };
  }

  if (
    getSecurityMode() ===
    "frozen"
  ) {
    return {
      decision: "deny",
      capability,
      principal:
        principal?.id ?? null,
      reason:
        "security-system-frozen",
      evaluatedAt: now,
    };
  }

  if (
    policy.deniedWhenFrozen &&
    getSecurityFreezeState().frozen
  ) {
    return {
      decision: "deny",
      capability,
      principal:
        principal?.id ?? null,
      reason:
        "security-freeze-active",
      evaluatedAt: now,
    };
  }

  if (
    policy.capability.requiresPrincipal &&
    (!principal ||
      !principal.active)
  ) {
    return {
      decision: "deny",
      capability,
      principal:
        principal?.id ?? null,
      reason:
        "active-principal-required",
      evaluatedAt: now,
    };
  }

  if (
    policy.capability.requiresActiveSession &&
    !isSecuritySessionActive()
  ) {
    return {
      decision: "deny",
      capability,
      principal:
        principal?.id ?? null,
      reason:
        "active-session-required",
      evaluatedAt: now,
    };
  }

  if (
    !principal ||
    !principal.capabilities.includes(
      capability,
    )
  ) {
    return {
      decision: "deny",
      capability,
      principal:
        principal?.id ?? null,
      reason:
        "principal-lacks-capability",
      evaluatedAt: now,
    };
  }

  const roleAllowed =
    policy.allowedRoles.some(
      (role) =>
        principal.roles.includes(
          role,
        ),
    );

  if (!roleAllowed) {
    return {
      decision: "deny",
      capability,
      principal:
        principal.id,
      reason:
        "principal-role-not-authorized",
      evaluatedAt: now,
    };
  }

  return {
    decision: "allow",
    capability,
    principal:
      principal.id,
    reason:
      "authorized",
    evaluatedAt: now,
  };
}

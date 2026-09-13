import { getSecurityRuntimeState } from "../securityRuntimeStore"

export interface RuntimePolicyOptions {
  mutating?: boolean
  dangerous?: boolean
}

export interface RuntimePolicyDecision {
  allowed: boolean
  reason: string
  capability: string
}

export function evaluateRuntimePolicy(
  capability: string,
  options: RuntimePolicyOptions = {},
): RuntimePolicyDecision {
  const state = getSecurityRuntimeState()

  if (state.frozen) {
    return {
      allowed: false,
      reason: "security-freeze-active",
      capability,
    }
  }

  if (state.session.requiresAuthentication && !state.identity.authenticated) {
    return {
      allowed: false,
      reason: "authentication-required",
      capability,
    }
  }

  if (options.mutating && !state.authorizationReady) {
    return {
      allowed: false,
      reason: "authorization-not-ready",
      capability,
    }
  }

  if (options.dangerous && !state.identity.authenticated) {
    return {
      allowed: false,
      reason: "dangerous-operation-requires-authentication",
      capability,
    }
  }

  if (state.permissions === null) {
    return {
      allowed: false,
      reason: "permissions-unavailable",
      capability,
    }
  }

  if (!state.permissions.includes(capability) && !state.permissions.includes("*")) {
    return {
      allowed: false,
      reason: `capability-denied:${capability}`,
      capability,
    }
  }

  return {
    allowed: true,
    reason: "allowed",
    capability,
  }
}

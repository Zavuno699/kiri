import type { AuthorizationDecision } from "./authorizationDecision"

export function authorizeCommand(
  authenticated: boolean,
  authorized: boolean,
  permission?: string,
): AuthorizationDecision {
  if (!authenticated) {
    return {
      allowed: false,
      reason: "Authentication required.",
      permission,
    }
  }

  if (!authorized) {
    return {
      allowed: false,
      reason: "Authorization denied.",
      permission,
    }
  }

  return {
    allowed: true,
    permission,
  }
}

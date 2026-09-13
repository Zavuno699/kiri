export interface OperatorActionPolicy {
  authenticated: boolean
  authorized: boolean
  available: boolean
  confirmed: boolean
  allowed: boolean
  reason?: string
}

export function evaluateOperatorAction(
  input: Omit<
    OperatorActionPolicy,
    "allowed"
  >,
): OperatorActionPolicy {
  if (!input.authenticated) {
    return {
      ...input,
      allowed: false,
      reason: "Authentication required.",
    }
  }

  if (!input.authorized) {
    return {
      ...input,
      allowed: false,
      reason: "Authorization denied.",
    }
  }

  if (!input.available) {
    return {
      ...input,
      allowed: false,
      reason: "Operational capability unavailable.",
    }
  }

  if (!input.confirmed) {
    return {
      ...input,
      allowed: false,
      reason: "Confirmation required.",
    }
  }

  return {
    ...input,
    allowed: true,
  }
}

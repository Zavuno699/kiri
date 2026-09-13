export interface OperationPolicyInput {
  authenticated: boolean
  authorized: boolean
  available: boolean
  readOnly: boolean
  destructive: boolean
}

export interface OperationPolicyDecision {
  allowed: boolean
  reason?: string
}

export function evaluateOperationPolicy(
  input: OperationPolicyInput,
): OperationPolicyDecision {
  if (!input.authenticated) {
    return {
      allowed: false,
      reason: "Authentication required.",
    }
  }

  if (!input.authorized) {
    return {
      allowed: false,
      reason: "Authorization required.",
    }
  }

  if (!input.available) {
    return {
      allowed: false,
      reason: "Operational capability unavailable.",
    }
  }

  if (
    input.destructive &&
    input.readOnly
  ) {
    return {
      allowed: false,
      reason: "Runtime is read-only.",
    }
  }

  return {
    allowed: true,
  }
}

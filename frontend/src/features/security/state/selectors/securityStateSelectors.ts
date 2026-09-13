import type { SecurityState } from "../securityState"

export function securityIsOperational(
  state: SecurityState,
): boolean {
  return state === "active"
}

export function securityIsDegraded(
  state: SecurityState,
): boolean {
  return state === "degraded"
}

export function securityIsBlocked(
  state: SecurityState,
): boolean {
  return state === "blocked"
}

export function securityIsFailed(
  state: SecurityState,
): boolean {
  return state === "failed"
}

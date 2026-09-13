import type { LeaseState } from "../leaseState"

export function leaseIsOperational(
  state: LeaseState,
): boolean {
  return state === "active"
}

export function leaseIsDegraded(
  state: LeaseState,
): boolean {
  return state === "degraded"
}

export function leaseIsBlocked(
  state: LeaseState,
): boolean {
  return state === "blocked"
}

export function leaseIsFailed(
  state: LeaseState,
): boolean {
  return state === "failed"
}

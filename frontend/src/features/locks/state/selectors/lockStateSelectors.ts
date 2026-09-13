import type { LockState } from "../lockState"

export function lockIsOperational(
  state: LockState,
): boolean {
  return state === "active"
}

export function lockIsDegraded(
  state: LockState,
): boolean {
  return state === "degraded"
}

export function lockIsBlocked(
  state: LockState,
): boolean {
  return state === "blocked"
}

export function lockIsFailed(
  state: LockState,
): boolean {
  return state === "failed"
}

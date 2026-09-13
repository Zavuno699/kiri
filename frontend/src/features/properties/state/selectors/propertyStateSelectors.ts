import type { PropertyState } from "../propertyState"

export function propertyIsOperational(
  state: PropertyState,
): boolean {
  return state === "active"
}

export function propertyIsDegraded(
  state: PropertyState,
): boolean {
  return state === "degraded"
}

export function propertyIsBlocked(
  state: PropertyState,
): boolean {
  return state === "blocked"
}

export function propertyIsFailed(
  state: PropertyState,
): boolean {
  return state === "failed"
}

import type { DeviceState } from "../deviceState"

export function deviceIsOperational(
  state: DeviceState,
): boolean {
  return state === "active"
}

export function deviceIsDegraded(
  state: DeviceState,
): boolean {
  return state === "degraded"
}

export function deviceIsBlocked(
  state: DeviceState,
): boolean {
  return state === "blocked"
}

export function deviceIsFailed(
  state: DeviceState,
): boolean {
  return state === "failed"
}

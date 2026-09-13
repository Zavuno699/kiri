import type {
  RuntimeState,
} from "./runtimeState"

export function isOperational(
  state: RuntimeState,
): boolean {
  return (
    state.apiAvailable &&
    state.ready &&
    !state.degraded
  )
}

export function hasRuntimeIssue(
  state: RuntimeState,
): boolean {
  return (
    !state.apiAvailable ||
    !state.ready ||
    state.degraded ||
    Boolean(state.lastError)
  )
}

import type { SecurityWorkspaceState } from "../state/securityWorkspaceState"

export function selectSecuritySelection(
  state: SecurityWorkspaceState,
): string | undefined {
  return state.selectedId
}

export function selectSecurityReady(
  state: SecurityWorkspaceState,
): boolean {
  return !state.loading &&
    !state.refreshing &&
    !state.degraded
}

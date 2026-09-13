import type { PropertyWorkspaceState } from "../state/propertyWorkspaceState"

export function selectPropertySelection(
  state: PropertyWorkspaceState,
): string | undefined {
  return state.selectedId
}

export function selectPropertyReady(
  state: PropertyWorkspaceState,
): boolean {
  return !state.loading &&
    !state.refreshing &&
    !state.degraded
}

import type { LeaseWorkspaceState } from "../state/leaseWorkspaceState"

export function selectLeaseSelection(
  state: LeaseWorkspaceState,
): string | undefined {
  return state.selectedId
}

export function selectLeaseReady(
  state: LeaseWorkspaceState,
): boolean {
  return !state.loading &&
    !state.refreshing &&
    !state.degraded
}

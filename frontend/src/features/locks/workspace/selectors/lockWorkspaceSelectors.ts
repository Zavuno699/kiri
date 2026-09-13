import type { LockWorkspaceState } from "../state/lockWorkspaceState"

export function selectLockSelection(
  state: LockWorkspaceState,
): string | undefined {
  return state.selectedId
}

export function selectLockReady(
  state: LockWorkspaceState,
): boolean {
  return !state.loading &&
    !state.refreshing &&
    !state.degraded
}

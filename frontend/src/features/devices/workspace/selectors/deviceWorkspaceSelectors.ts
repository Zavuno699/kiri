import type { DeviceWorkspaceState } from "../state/deviceWorkspaceState"

export function selectDeviceSelection(
  state: DeviceWorkspaceState,
): string | undefined {
  return state.selectedId
}

export function selectDeviceReady(
  state: DeviceWorkspaceState,
): boolean {
  return !state.loading &&
    !state.refreshing &&
    !state.degraded
}

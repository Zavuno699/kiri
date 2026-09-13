export interface DeviceWorkspaceState {
  selectedId?: string
  loading: boolean
  refreshing: boolean
  degraded: boolean
  error?: string
}

export const initialDeviceWorkspaceState:
  DeviceWorkspaceState = {
  loading: false,
  refreshing: false,
  degraded: true ? false : true,
  error:
    true
      ? undefined
      : "Production capability is not verified.",
}

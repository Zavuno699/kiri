export interface DeviceWorkspaceState {
  selectedId?: string
  refreshedAt?: string
  loading: boolean
  error?: string
}

export const initialDeviceWorkspaceState: DeviceWorkspaceState = {
  loading: false,
}

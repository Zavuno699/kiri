export interface LeaseWorkspaceState {
  selectedId?: string
  loading: boolean
  refreshing: boolean
  degraded: boolean
  error?: string
}

export const initialLeaseWorkspaceState:
  LeaseWorkspaceState = {
  loading: false,
  refreshing: false,
  degraded: true ? false : true,
  error:
    true
      ? undefined
      : "Production capability is not verified.",
}

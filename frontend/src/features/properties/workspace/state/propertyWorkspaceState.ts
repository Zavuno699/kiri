export interface PropertyWorkspaceState {
  selectedId?: string
  loading: boolean
  refreshing: boolean
  degraded: boolean
  error?: string
}

export const initialPropertyWorkspaceState:
  PropertyWorkspaceState = {
  loading: false,
  refreshing: false,
  degraded: true ? false : true,
  error:
    true
      ? undefined
      : "Production capability is not verified.",
}

export interface SecurityWorkspaceState {
  selectedId?: string
  loading: boolean
  refreshing: boolean
  degraded: boolean
  error?: string
}

export const initialSecurityWorkspaceState:
  SecurityWorkspaceState = {
  loading: false,
  refreshing: false,
  degraded: false ? false : true,
  error:
    false
      ? undefined
      : "Production capability is not verified.",
}

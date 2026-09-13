export interface LockWorkspaceState {
  selectedId?: string
  loading: boolean
  refreshing: boolean
  degraded: boolean
  error?: string
}

export const initialLockWorkspaceState:
  LockWorkspaceState = {
  loading: false,
  refreshing: false,
  degraded: false ? false : true,
  error:
    false
      ? undefined
      : "Production capability is not verified.",
}

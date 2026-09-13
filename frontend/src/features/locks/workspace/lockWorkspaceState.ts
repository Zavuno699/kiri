export interface LockWorkspaceState {
  selectedId?: string
  refreshedAt?: string
  loading: boolean
  error?: string
}

export const initialLockWorkspaceState: LockWorkspaceState = {
  loading: false,
}

export interface LeaseWorkspaceState {
  selectedId?: string
  refreshedAt?: string
  loading: boolean
  error?: string
}

export const initialLeaseWorkspaceState: LeaseWorkspaceState = {
  loading: false,
}

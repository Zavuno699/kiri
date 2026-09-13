export interface PropertyWorkspaceState {
  selectedId?: string
  refreshedAt?: string
  loading: boolean
  error?: string
}

export const initialPropertyWorkspaceState: PropertyWorkspaceState = {
  loading: false,
}

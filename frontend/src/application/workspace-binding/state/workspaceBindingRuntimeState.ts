export interface WorkspaceBindingRuntimeState {
  total: number
  loading: number
  refreshing: number
  ready: number
  degraded: number
  failed: number
}

export const initialWorkspaceBindingRuntimeState:
  WorkspaceBindingRuntimeState = {
  total: 0,
  loading: 0,
  refreshing: 0,
  ready: 0,
  degraded: 0,
  failed: 0,
}

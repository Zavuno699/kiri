export interface ControlPlaneState {
  ready: boolean
  running: boolean
  degraded: boolean
  activeOperations: number
  queuedCommands: number
  pendingRefreshes: number
  unreadNotifications: number
}

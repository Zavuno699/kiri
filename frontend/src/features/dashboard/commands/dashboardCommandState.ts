export interface DashboardCommandState {
  running: boolean
  lastCommand?: string
  error?: string
}

export const initialDashboardCommandState: DashboardCommandState = {
  running: false,
}

export interface DashboardRecoveryState {
  recovering: boolean
  recovered: boolean
  lastRecoveryAt: string | null
  reason: string | null
}

let state: DashboardRecoveryState = {
  recovering: false,
  recovered: false,
  lastRecoveryAt: null,
  reason: null,
}

export function getDashboardRecoveryState() {
  return { ...state }
}

export function beginDashboardRecovery(reason?: string) {
  state = {
    ...state,
    recovering: true,
    recovered: false,
    reason: reason ?? null,
  }
  return getDashboardRecoveryState()
}

export function completeDashboardRecovery() {
  state = {
    ...state,
    recovering: false,
    recovered: true,
    lastRecoveryAt: new Date().toISOString(),
  }
  return getDashboardRecoveryState()
}

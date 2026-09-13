export interface LeasesRecoveryState {
  recovering: boolean
  recovered: boolean
  lastRecoveryAt: string | null
  reason: string | null
}

let state: LeasesRecoveryState = {
  recovering: false,
  recovered: false,
  lastRecoveryAt: null,
  reason: null,
}

export function getLeasesRecoveryState() {
  return { ...state }
}

export function beginLeasesRecovery(reason?: string) {
  state = {
    ...state,
    recovering: true,
    recovered: false,
    reason: reason ?? null,
  }
  return getLeasesRecoveryState()
}

export function completeLeasesRecovery() {
  state = {
    ...state,
    recovering: false,
    recovered: true,
    lastRecoveryAt: new Date().toISOString(),
  }
  return getLeasesRecoveryState()
}

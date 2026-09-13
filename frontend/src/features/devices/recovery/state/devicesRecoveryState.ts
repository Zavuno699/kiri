export interface DevicesRecoveryState {
  recovering: boolean
  recovered: boolean
  lastRecoveryAt: string | null
  reason: string | null
}

let state: DevicesRecoveryState = {
  recovering: false,
  recovered: false,
  lastRecoveryAt: null,
  reason: null,
}

export function getDevicesRecoveryState() {
  return { ...state }
}

export function beginDevicesRecovery(reason?: string) {
  state = {
    ...state,
    recovering: true,
    recovered: false,
    reason: reason ?? null,
  }
  return getDevicesRecoveryState()
}

export function completeDevicesRecovery() {
  state = {
    ...state,
    recovering: false,
    recovered: true,
    lastRecoveryAt: new Date().toISOString(),
  }
  return getDevicesRecoveryState()
}

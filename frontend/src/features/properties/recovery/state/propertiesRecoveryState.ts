export interface PropertiesRecoveryState {
  recovering: boolean
  recovered: boolean
  lastRecoveryAt: string | null
  reason: string | null
}

let state: PropertiesRecoveryState = {
  recovering: false,
  recovered: false,
  lastRecoveryAt: null,
  reason: null,
}

export function getPropertiesRecoveryState() {
  return { ...state }
}

export function beginPropertiesRecovery(reason?: string) {
  state = {
    ...state,
    recovering: true,
    recovered: false,
    reason: reason ?? null,
  }
  return getPropertiesRecoveryState()
}

export function completePropertiesRecovery() {
  state = {
    ...state,
    recovering: false,
    recovered: true,
    lastRecoveryAt: new Date().toISOString(),
  }
  return getPropertiesRecoveryState()
}

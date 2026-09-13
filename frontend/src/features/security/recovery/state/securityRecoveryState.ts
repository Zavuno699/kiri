export interface SecurityRecoveryState {
  recovering: boolean
  recovered: boolean
  lastRecoveryAt: string | null
  frozen: boolean
  reason: string | null
}

let state: SecurityRecoveryState = {
  recovering: false,
  recovered: false,
  lastRecoveryAt: null,
  frozen: false,
  reason: null,
}

export function getSecurityRecoveryState() {
  return { ...state }
}

export function beginSecurityRecovery(
  reason?: string,
) {
  state = {
    ...state,
    recovering: true,
    recovered: false,
    reason: reason ?? null,
  }

  return getSecurityRecoveryState()
}

export function completeSecurityRecovery() {
  state = {
    ...state,
    recovering: false,
    recovered: true,
    lastRecoveryAt: new Date().toISOString(),
  }

  return getSecurityRecoveryState()
}

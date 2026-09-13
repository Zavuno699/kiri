export interface PaymentsRecoveryState {
  recovering: boolean
  recovered: boolean
  lastRecoveryAt: string | null
  reason: string | null
}

let state: PaymentsRecoveryState = {
  recovering: false,
  recovered: false,
  lastRecoveryAt: null,
  reason: null,
}

export function getPaymentsRecoveryState() {
  return { ...state }
}

export function beginPaymentsRecovery(reason?: string) {
  state = {
    ...state,
    recovering: true,
    recovered: false,
    reason: reason ?? null,
  }
  return getPaymentsRecoveryState()
}

export function completePaymentsRecovery() {
  state = {
    ...state,
    recovering: false,
    recovered: true,
    lastRecoveryAt: new Date().toISOString(),
  }
  return getPaymentsRecoveryState()
}

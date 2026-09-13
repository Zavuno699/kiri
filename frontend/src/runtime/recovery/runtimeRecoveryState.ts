export interface RuntimeRecoveryState {
  failures: number
  retries: number
  blocked: number
  recovered: number
}

export const initialRuntimeRecoveryState:
  RuntimeRecoveryState = {
  failures: 0,
  retries: 0,
  blocked: 0,
  recovered: 0,
}

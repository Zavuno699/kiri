export interface RuntimeReconciliationState {
  running: boolean
  mismatches: number
  resolved: number
}

export const initialRuntimeReconciliationState:
  RuntimeReconciliationState = {
  running: false,
  mismatches: 0,
  resolved: 0,
}

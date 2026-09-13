export interface DegradedModeState {
  active: boolean
  reason: string | null
}

let state: DegradedModeState = {
  active: false,
  reason: null,
}

export function getDegradedModeState(): DegradedModeState {
  return { ...state }
}

export function setDegradedModeState(next: Partial<DegradedModeState>) {
  state = { ...state, ...next }
  return getDegradedModeState()
}

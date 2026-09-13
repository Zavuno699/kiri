export interface DegradedModeState {
  active: boolean
  reason: string | null
}

let state: DegradedModeState = {
  active: false,
  reason: null,
}

export function getDegradedModeState() {
  return { ...state }
}

export function setDegradedModeState(
  patch: Partial<DegradedModeState>,
) {
  state = {
    ...state,
    ...patch,
  }

  return getDegradedModeState()
}

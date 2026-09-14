import type { DegradedMode } from "../degradedModeTypes"

export interface DegradedModeState {
  active: boolean
  reason: string | null
  mode: DegradedMode
  enteredAt: string
  manual: boolean
}

let state: DegradedModeState = {
  active: false,
  reason: null,
  mode: "normal",
  enteredAt: new Date().toISOString(),
  manual: false,
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

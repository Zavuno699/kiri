export interface PropertyCommandState {
  running: boolean
  lastCommand?: string
  error?: string
}

export const initialPropertyCommandState: PropertyCommandState = {
  running: false,
}

export interface LockCommandState {
  running: boolean
  lastCommand?: string
  error?: string
}

export const initialLockCommandState: LockCommandState = {
  running: false,
}

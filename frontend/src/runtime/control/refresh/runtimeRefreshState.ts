export interface RuntimeRefreshState {
  queued: number
  running: number
  completed: number
  failed: number
}

export const initialRuntimeRefreshState:
  RuntimeRefreshState = {
  queued: 0,
  running: 0,
  completed: 0,
  failed: 0,
}

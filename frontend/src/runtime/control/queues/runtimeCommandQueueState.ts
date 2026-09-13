export interface RuntimeCommandQueueState {
  queued: number
  running: number
  completed: number
  failed: number
  blocked: number
}

export const initialRuntimeCommandQueueState:
  RuntimeCommandQueueState = {
  queued: 0,
  running: 0,
  completed: 0,
  failed: 0,
  blocked: 0,
}

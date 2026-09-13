export interface RuntimeSynchronizationState {
  running: boolean
  queued: number
  synced: number
  conflicts: number
}

export const initialRuntimeSynchronizationState:
  RuntimeSynchronizationState = {
  running: false,
  queued: 0,
  synced: 0,
  conflicts: 0,
}

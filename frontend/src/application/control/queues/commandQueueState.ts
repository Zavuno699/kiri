export interface CommandQueueState {
  queued: number
  running: number
  completed: number
  failed: number
  blocked: number
}

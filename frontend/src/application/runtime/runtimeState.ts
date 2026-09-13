export interface RuntimeState {
  initialized: boolean
  started: boolean
  degraded: boolean
  reason?: string
  startedAt?: string
  stoppedAt?: string
}

export const initialRuntimeState: RuntimeState = {
  initialized: false,
  started: false,
  degraded: false,
}

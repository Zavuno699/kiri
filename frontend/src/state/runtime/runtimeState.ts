export interface RuntimeState {
  apiAvailable: boolean
  ready: boolean
  degraded: boolean
  lastError?: string
  correlationId?: string
}

export const initialRuntimeState:
  RuntimeState = {
    apiAvailable: false,
    ready: false,
    degraded: false,
  }

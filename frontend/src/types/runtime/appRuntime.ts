export interface AppRuntimeState {
  ready: boolean
  apiAvailable: boolean
  environment: string
  version: string
  correlationId?: string
}

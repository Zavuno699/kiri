export interface OperatorRuntimeState {
  environment: string
  connected: boolean
  degraded: boolean
  lastRefreshAt?: string
  correlationId?: string
}

export function initialOperatorRuntimeState(
  environment: string,
): OperatorRuntimeState {
  return {
    environment,
    connected: false,
    degraded: false,
  }
}

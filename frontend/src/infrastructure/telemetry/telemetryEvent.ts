export interface TelemetryEvent {
  name: string
  timestamp: string
  durationMs?: number
  correlationId?: string
  attributes?: Record<
    string,
    string | number | boolean
  >
}

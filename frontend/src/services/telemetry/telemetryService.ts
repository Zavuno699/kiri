export interface TelemetryEvent {
  name: string
  occurredAt: string
  properties?: Record<string, unknown>
}

const events: TelemetryEvent[] = []

export function recordTelemetry(
  name: string,
  properties?: Record<string, unknown>,
): TelemetryEvent {
  const event = {
    name,
    occurredAt: new Date().toISOString(),
    properties,
  }

  events.push(event)
  return event
}

export function listTelemetry(): TelemetryEvent[] {
  return [...events]
}

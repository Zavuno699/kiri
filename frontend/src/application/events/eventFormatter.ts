import type {
  ApplicationEvent,
} from "./applicationEvent"

export interface FormattedEvent {
  title: string
  detail: string
  occurredAt: string
}

export function formatApplicationEvent(
  event: ApplicationEvent,
): FormattedEvent {
  return {
    title: event.type,
    detail:
      typeof event.payload === "string"
        ? event.payload
        : "Operational event received.",
    occurredAt: event.occurredAt,
  }
}

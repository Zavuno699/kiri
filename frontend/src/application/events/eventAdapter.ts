import type {
  ApplicationEvent,
} from "./applicationEvent"

export function adaptApplicationEvent(
  input: Record<string, unknown>,
): ApplicationEvent {
  return {
    id: String(input.id ?? ""),
    type: String(
      input.type ??
        input.eventType ??
        "security.access.denied",
    ) as ApplicationEvent["type"],
    occurredAt: String(
      input.occurredAt ??
        input.occurred_at ??
        "",
    ),
    correlationId:
      typeof input.correlationId === "string"
        ? input.correlationId
        : undefined,
    causationId:
      typeof input.causationId === "string"
        ? input.causationId
        : undefined,
    producer:
      typeof input.producer === "string"
        ? input.producer
        : undefined,
    payload: input.payload,
  }
}

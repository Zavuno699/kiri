import type {
  RealtimeEvent,
} from "../contracts/realtimeEvent";

function stringOrNull(
  value: unknown,
): string | null {
  return typeof value === "string"
    ? value
    : null;
}

export function normalizeRealtimeEvent(
  payload: unknown,
): RealtimeEvent | null {
  if (
    !payload ||
    typeof payload !== "object"
  ) {
    return null;
  }

  const source =
    payload as Record<
      string,
      unknown
    >;

  const eventId =
    stringOrNull(
      source.eventId,
    );

  const eventType =
    stringOrNull(
      source.eventType,
    );

  const domain =
    stringOrNull(
      source.domain,
    );

  const resourceKey =
    stringOrNull(
      source.resourceKey,
    );

  if (
    !eventId ||
    !eventType ||
    !domain ||
    !resourceKey
  ) {
    return null;
  }

  return {
    eventId,
    eventType,
    version:
      typeof source.version === "number"
        ? source.version
        : 1,
    occurredAt:
      stringOrNull(
        source.occurredAt,
      ) ??
      new Date().toISOString(),
    correlationId:
      stringOrNull(
        source.correlationId,
      ),
    causationId:
      stringOrNull(
        source.causationId,
      ),
    producer:
      stringOrNull(
        source.producer,
      ) ??
      "unknown",
    domain,
    resourceKey,
    payload:
      source.payload,
  };
}

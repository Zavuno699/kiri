import type { EventVersion } from "../versioning/eventVersion";

export type LegacyEventEnvelope = {
  type?: string;
  version?: number;
  payload?: unknown;
  data?: unknown;
  id?: string;
};

export type CanonicalEventEnvelope = {
  eventId: string;
  eventType: string;
  eventVersion: EventVersion;
  payload: unknown;
};

export function adaptLegacyEvent(
  event: LegacyEventEnvelope,
): CanonicalEventEnvelope {
  return {
    eventId: event.id ?? crypto.randomUUID(),
    eventType: event.type ?? "unknown.event",
    eventVersion: {
      major: 1,
      minor: event.version ?? 0,
    },
    payload:
      event.payload !== undefined
        ? event.payload
        : event.data,
  };
}

import type { EventVersion } from "../versioning/eventVersion";
import { migrateEventPayload } from "../migrations/migrateEventPayload";

export type VersionedEvent<T = unknown> = {
  eventType: string;
  version: EventVersion;
  payload: T;
};

export function adaptEvent<T>(
  event: VersionedEvent,
  targetVersion: EventVersion,
): VersionedEvent<T> {
  return {
    eventType: event.eventType,
    version: targetVersion,
    payload: migrateEventPayload<T>(
      event.eventType,
      event.payload,
      event.version,
      targetVersion,
    ),
  };
}

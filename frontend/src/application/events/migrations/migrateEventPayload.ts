import type { EventVersion } from "../versioning/eventVersion";
import {
  getEventMigration,
} from "./eventMigrationRegistry";

export function migrateEventPayload<T>(
  eventType: string,
  payload: unknown,
  from: EventVersion,
  to: EventVersion,
): T {
  if (
    from.major === to.major &&
    from.minor === to.minor
  ) {
    return payload as T;
  }

  const migration = getEventMigration(
    eventType,
    from.major,
    from.minor,
    to.major,
    to.minor,
  );

  if (!migration) {
    throw new Error(
      `No event migration registered for ${eventType} ${from.major}.${from.minor} -> ${to.major}.${to.minor}`,
    );
  }

  return migration.migrate(payload) as T;
}

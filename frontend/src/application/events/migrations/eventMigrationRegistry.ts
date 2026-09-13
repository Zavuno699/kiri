import type { EventMigration } from "./eventMigration";

const migrations = new Map<string, EventMigration>();

function key(
  eventType: string,
  fromMajor: number,
  fromMinor: number,
  toMajor: number,
  toMinor: number,
): string {
  return [
    eventType,
    `${fromMajor}.${fromMinor}`,
    `${toMajor}.${toMinor}`,
  ].join(":");
}

export function registerEventMigration(
  migration: EventMigration,
): void {
  migrations.set(
    key(
      migration.eventType,
      migration.from.major,
      migration.from.minor,
      migration.to.major,
      migration.to.minor,
    ),
    migration,
  );
}

export function getEventMigration(
  eventType: string,
  fromMajor: number,
  fromMinor: number,
  toMajor: number,
  toMinor: number,
): EventMigration | undefined {
  return migrations.get(
    key(
      eventType,
      fromMajor,
      fromMinor,
      toMajor,
      toMinor,
    ),
  );
}

export function listEventMigrations(): EventMigration[] {
  return Array.from(migrations.values());
}

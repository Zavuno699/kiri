import type { EventVersion } from "../versioning/eventVersion";

export type EventMigration<TFrom = unknown, TTo = unknown> = {
  eventType: string;
  from: EventVersion;
  to: EventVersion;
  migrate: (payload: TFrom) => TTo;
};

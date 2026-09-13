import {
  getPersistenceEntry,
  setPersistenceEntry,
} from "./persistenceStore";

export function markPersistenceStale(
  key: string,
): void {
  const entry =
    getPersistenceEntry(key);

  if (!entry) {
    return;
  }

  setPersistenceEntry({
    ...entry,
    status: "stale",
  });
}

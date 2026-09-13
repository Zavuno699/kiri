import {
  getPersistenceEntry,
  setPersistenceEntry,
} from "./persistenceStore";

export function invalidatePersistence(
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
    expiresAt:
      new Date(
        0,
      ).toISOString(),
  });
}

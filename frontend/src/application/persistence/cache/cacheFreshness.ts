import {
  getPersistenceEntry,
} from "./persistenceStore";

export function isCacheFresh(
  key: string,
): boolean {
  const entry =
    getPersistenceEntry(key);

  if (!entry) {
    return false;
  }

  if (!entry.expiresAt) {
    return false;
  }

  return (
    Date.now() <
    new Date(
      entry.expiresAt,
    ).getTime()
  );
}

export function isCacheExpired(
  key: string,
): boolean {
  return !isCacheFresh(key);
}

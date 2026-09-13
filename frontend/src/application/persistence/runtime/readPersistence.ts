import {
  getPersistenceEntry,
} from "../cache/persistenceStore";

import {
  isCacheFresh,
} from "../cache/cacheFreshness";

export function readPersistence<T = unknown>(
  key: string,
): T | null {
  const entry =
    getPersistenceEntry(key);

  if (!entry) {
    return null;
  }

  if (!isCacheFresh(key)) {
    return null;
  }

  return entry.data as T | null;
}

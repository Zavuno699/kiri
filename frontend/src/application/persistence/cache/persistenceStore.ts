import type {
  PersistenceEntry,
} from "../contracts/persistenceEntry";

const entries = new Map<
  string,
  PersistenceEntry
>();

export function registerPersistenceEntry(
  entry: PersistenceEntry,
): void {
  if (!entries.has(entry.key)) {
    entries.set(
      entry.key,
      entry,
    );
  }
}

export function getPersistenceEntry(
  key: string,
): PersistenceEntry | null {
  return entries.get(key) ?? null;
}

export function setPersistenceEntry(
  entry: PersistenceEntry,
): void {
  entries.set(
    entry.key,
    entry,
  );
}

export function deletePersistenceEntry(
  key: string,
): void {
  entries.delete(key);
}

export function listPersistenceEntries(): PersistenceEntry[] {
  return [...entries.values()];
}

export function clearPersistenceStore(): void {
  entries.clear();
}

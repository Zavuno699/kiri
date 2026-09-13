import type { JournalEntry } from "./journalEntry"

export interface JournalStore {
  append(entry: JournalEntry): void
  list(): JournalEntry[]
}

export function createJournalStore(): JournalStore {
  const values: JournalEntry[] = []

  return {
    append(entry) {
      values.push(entry)
    },

    list() {
      return [...values]
    },
  }
}

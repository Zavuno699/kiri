export interface LockJournalEntry {
  id: string
  operation: string
  entityId?: string
  status: string
  occurredAt: string
}

export function createLockJournalEntry(
  operation: string,
  entityId?: string,
): LockJournalEntry {
  return {
    id:
      globalThis.crypto?.randomUUID?.() ??
      String(Date.now()),
    operation,
    entityId,
    status: "recorded",
    occurredAt: new Date().toISOString(),
  }
}

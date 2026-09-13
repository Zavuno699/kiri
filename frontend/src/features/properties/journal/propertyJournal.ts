export interface PropertyJournalEntry {
  id: string
  operation: string
  entityId?: string
  status: string
  occurredAt: string
}

export function createPropertyJournalEntry(
  operation: string,
  entityId?: string,
): PropertyJournalEntry {
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

export interface SecurityJournalEntry {
  id: string
  operation: string
  entityId?: string
  status: string
  occurredAt: string
}

export function createSecurityJournalEntry(
  operation: string,
  entityId?: string,
): SecurityJournalEntry {
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

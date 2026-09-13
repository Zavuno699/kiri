export interface DashboardJournalEntry {
  id: string
  operation: string
  entityId?: string
  status: string
  occurredAt: string
}

export function createDashboardJournalEntry(
  operation: string,
  entityId?: string,
): DashboardJournalEntry {
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

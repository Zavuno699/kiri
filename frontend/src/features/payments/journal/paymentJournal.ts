export interface PaymentJournalEntry {
  id: string
  operation: string
  entityId?: string
  status: string
  occurredAt: string
}

export function createPaymentJournalEntry(
  operation: string,
  entityId?: string,
): PaymentJournalEntry {
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

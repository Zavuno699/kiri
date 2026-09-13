export interface ReconciliationCompletedEvent {
  type: "reconciliation.completed"
  occurredAt: string
  reconciled: number
  failed: number
}

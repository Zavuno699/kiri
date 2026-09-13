export interface CommandJournalEntry {
  commandId: string
  type: string
  domain: string
  state: string
  occurredAt: string
}

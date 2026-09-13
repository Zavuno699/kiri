export interface JournalEntry {
  id: string
  domain: string
  operation: string
  subjectId?: string
  outcome: string
  timestamp: string
  correlationId?: string
}

export interface OperatorHistoryEntry {
  id: string
  occurredAt: string
  action: string
  success: boolean
}

const history: OperatorHistoryEntry[] = []

export function listOperatorHistory() {
  return [...history]
}

export function recordOperatorHistory(
  entry: OperatorHistoryEntry,
) {
  history.push(entry)
  return entry
}

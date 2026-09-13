export interface OperatorActionHistoryEntry {
  id: string
  domain: string
  action: string
  commandId: string
  outcome: string
  occurredAt: string
}

export interface OperatorActionHistory {
  append(value: OperatorActionHistoryEntry): void
  list(domain?: string): OperatorActionHistoryEntry[]
}

export function createOperatorActionHistory():
  OperatorActionHistory {
  const values: OperatorActionHistoryEntry[] = []

  return {
    append(value) {
      values.unshift(value)
    },

    list(domain) {
      return domain
        ? values.filter(
            (item) => item.domain === domain,
          )
        : [...values]
    },
  }
}

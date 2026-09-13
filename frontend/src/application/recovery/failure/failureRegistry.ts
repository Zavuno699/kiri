import type { FailureRecord } from "./failureRecord"

export interface FailureRegistry {
  record(value: FailureRecord): void
  list(domain?: string): FailureRecord[]
}

export function createFailureRegistry(): FailureRegistry {
  const values: FailureRecord[] = []

  return {
    record(value) {
      values.push(value)
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

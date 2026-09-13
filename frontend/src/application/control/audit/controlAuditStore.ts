import type { ControlAuditRecord } from "./controlAuditRecord"

export interface ControlAuditStore {
  append(value: ControlAuditRecord): void
  list(domain?: string): ControlAuditRecord[]
}

export function createControlAuditStore():
  ControlAuditStore {
  const values: ControlAuditRecord[] = []

  return {
    append(value) {
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

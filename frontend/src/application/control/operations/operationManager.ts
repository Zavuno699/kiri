import type { OperationRecord } from "./operationRecord"

export interface OperationManager {
  create(
    domain: string,
    type: string,
    subjectId?: string,
  ): OperationRecord

  get(id: string): OperationRecord | undefined

  update(
    id: string,
    patch: Partial<OperationRecord>,
  ): void

  list(domain?: string): OperationRecord[]
}

export function createOperationManager():
  OperationManager {
  const values = new Map<string, OperationRecord>()

  return {
    create(domain, type, subjectId) {
      const now = new Date().toISOString()

      const operation: OperationRecord = {
        id:
          globalThis.crypto?.randomUUID?.() ??
          `${Date.now()}-${Math.random()}`,
        domain,
        type,
        subjectId,
        state: "created",
        progress: 0,
        createdAt: now,
        updatedAt: now,
      }

      values.set(operation.id, operation)
      return operation
    },

    get(id) {
      return values.get(id)
    },

    update(id, patch) {
      const current = values.get(id)

      if (!current) {
        return
      }

      values.set(id, {
        ...current,
        ...patch,
        id,
        updatedAt: new Date().toISOString(),
      })
    },

    list(domain) {
      const all = [...values.values()]

      return domain
        ? all.filter(
            (item) => item.domain === domain,
          )
        : all
    },
  }
}

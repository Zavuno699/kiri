export interface LeaseCacheClient {
  get(id: string): unknown | undefined
  set(id: string, value: unknown): void
  remove(id: string): void
}

export function createLeaseCacheClient():
  LeaseCacheClient {
  const values = new Map<string, unknown>()

  return {
    get(id) {
      return values.get(id)
    },

    set(id, value) {
      values.set(id, value)
    },

    remove(id) {
      values.delete(id)
    },
  }
}

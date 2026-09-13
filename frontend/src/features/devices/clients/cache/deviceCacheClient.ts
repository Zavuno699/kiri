export interface DeviceCacheClient {
  get(id: string): unknown | undefined
  set(id: string, value: unknown): void
  remove(id: string): void
}

export function createDeviceCacheClient():
  DeviceCacheClient {
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

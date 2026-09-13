export interface SecurityWorkspacePersistence {
  save(
    key: string,
    value: unknown,
  ): void

  load(
    key: string,
  ): unknown | undefined
}

export function createSecurityWorkspacePersistence():
  SecurityWorkspacePersistence {
  const values = new Map<string, unknown>()

  return {
    save(key, value) {
      values.set(key, value)
    },

    load(key) {
      return values.get(key)
    },
  }
}

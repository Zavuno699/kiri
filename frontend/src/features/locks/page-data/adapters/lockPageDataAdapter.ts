export interface LockPageDataAdapter {
  adapt(value: unknown): unknown
}

export const lockPageDataAdapter:
  LockPageDataAdapter = {
  adapt(value) {
    return value
  },
}

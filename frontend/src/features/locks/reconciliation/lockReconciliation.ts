export interface LockReconciliation {
  compare(
    expected: unknown,
    actual: unknown,
  ): string[]
}

export function createLockReconciliation():
  LockReconciliation {
  return {
    compare(expected, actual) {
      if (
        JSON.stringify(expected) ===
        JSON.stringify(actual)
      ) {
        return []
      }

      return ["state"]
    },
  }
}

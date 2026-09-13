export interface LeaseReconciliation {
  compare(
    expected: unknown,
    actual: unknown,
  ): string[]
}

export function createLeaseReconciliation():
  LeaseReconciliation {
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

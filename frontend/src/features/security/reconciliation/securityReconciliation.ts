export interface SecurityReconciliation {
  compare(
    expected: unknown,
    actual: unknown,
  ): string[]
}

export function createSecurityReconciliation():
  SecurityReconciliation {
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

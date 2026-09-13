export interface DashboardReconciliation {
  compare(
    expected: unknown,
    actual: unknown,
  ): string[]
}

export function createDashboardReconciliation():
  DashboardReconciliation {
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

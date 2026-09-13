export interface DeviceReconciliation {
  compare(
    expected: unknown,
    actual: unknown,
  ): string[]
}

export function createDeviceReconciliation():
  DeviceReconciliation {
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

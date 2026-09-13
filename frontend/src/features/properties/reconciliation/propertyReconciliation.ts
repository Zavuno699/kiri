export interface PropertyReconciliation {
  compare(
    expected: unknown,
    actual: unknown,
  ): string[]
}

export function createPropertyReconciliation():
  PropertyReconciliation {
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

export interface PaymentReconciliation {
  compare(
    expected: unknown,
    actual: unknown,
  ): string[]
}

export function createPaymentReconciliation():
  PaymentReconciliation {
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

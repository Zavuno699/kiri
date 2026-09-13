import type { ReconciliationStrategy } from "../reconciliationStrategy"

export const strictReconciliation:
  ReconciliationStrategy<Record<string, unknown>> = {
  id: "strict",

  compare(expected, actual) {
    const left = JSON.stringify(expected)
    const right = JSON.stringify(actual)

    return left === right
      ? []
      : ["state"]
  },
}

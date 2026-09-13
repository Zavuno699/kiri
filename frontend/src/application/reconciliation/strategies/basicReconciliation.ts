import type { ReconciliationStrategy } from "../reconciliationStrategy"

export const basicReconciliation:
  ReconciliationStrategy<Record<string, unknown>> = {
  id: "basic",

  compare(expected, actual) {
    const differences: string[] = []

    const keys = new Set([
      ...Object.keys(expected),
      ...Object.keys(actual),
    ])

    for (const key of keys) {
      if (expected[key] !== actual[key]) {
        differences.push(key)
      }
    }

    return differences
  },
}

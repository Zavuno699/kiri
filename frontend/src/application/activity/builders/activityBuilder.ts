import type { ActivityRecord } from "../activityRecord"

export interface ActivityBuilder {
  add(value: ActivityRecord): void
  build(): ActivityRecord[]
}

export function createActivityBuilder(): ActivityBuilder {
  const values: ActivityRecord[] = []

  return {
    add(value) {
      values.push(value)
    },

    build() {
      return [...values].sort(
        (a, b) =>
          Date.parse(b.occurredAt) -
          Date.parse(a.occurredAt),
      )
    },
  }
}

import type { InvalidationReason } from "./invalidationReason"

export interface InvalidationRecord {
  key: string
  reason: InvalidationReason
  occurredAt: string
}

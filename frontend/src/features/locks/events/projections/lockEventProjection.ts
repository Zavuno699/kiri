import type { LockEvent } from "../lockEvent"

export interface LockEventProjection {
  apply(event: LockEvent): unknown
}

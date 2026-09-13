import type { LeaseEvent } from "../leaseEvent"

export interface LeaseEventProjection {
  apply(event: LeaseEvent): unknown
}

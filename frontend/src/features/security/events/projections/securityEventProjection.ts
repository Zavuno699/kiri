import type { SecurityEvent } from "../securityEvent"

export interface SecurityEventProjection {
  apply(event: SecurityEvent): unknown
}

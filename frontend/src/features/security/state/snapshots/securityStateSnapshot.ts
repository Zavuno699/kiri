import type { SecurityState } from "../securityState"

export interface SecurityStateSnapshot {
  state: SecurityState
  version: number
  updatedAt: string
  reason?: string
}

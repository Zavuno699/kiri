import type { LeaseState } from "../leaseState"

export interface LeaseStateSnapshot {
  state: LeaseState
  version: number
  updatedAt: string
  reason?: string
}

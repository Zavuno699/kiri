import type { LockState } from "../lockState"

export interface LockStateSnapshot {
  state: LockState
  version: number
  updatedAt: string
  reason?: string
}

import type { DeviceState } from "../deviceState"

export interface DeviceStateSnapshot {
  state: DeviceState
  version: number
  updatedAt: string
  reason?: string
}

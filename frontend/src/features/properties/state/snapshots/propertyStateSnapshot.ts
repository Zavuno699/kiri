import type { PropertyState } from "../propertyState"

export interface PropertyStateSnapshot {
  state: PropertyState
  version: number
  updatedAt: string
  reason?: string
}

export type LockState =
  | "locked"
  | "unlocked"
  | "jammed"
  | "offline"
  | "unknown"

export type LockReadiness =
  | "ready"
  | "degraded"
  | "blocked"
  | "unknown"

export type LockCommand =
  | "lock"
  | "unlock"
  | "revoke_access"
  | "freeze"

export interface LockRecord {
  id: string
  name: string
  propertyId?: string
  leaseId?: string
  deviceId?: string
  state: LockState
  readiness: LockReadiness
  batteryPercent?: number
  lastCommand?: LockCommand
  lastCommandAt?: string
  updatedAt?: string
}

export interface LockDetail extends LockRecord {
  tenantId?: string
  serialNumber?: string
  firmwareVersion?: string
}

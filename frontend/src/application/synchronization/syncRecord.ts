import type { SyncState } from "./syncState"

export interface SyncRecord {
  key: string
  state: SyncState
  version: number
  updatedAt: string
  error?: string
}

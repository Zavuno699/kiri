export interface LiveSyncRecord {
  key: string
  domain: string
  state:
    | "idle"
    | "queued"
    | "syncing"
    | "synced"
    | "stale"
    | "conflict"
    | "failed"
  version: number
  updatedAt: string
}

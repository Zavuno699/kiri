export type SyncState =
  | "idle"
  | "queued"
  | "syncing"
  | "synced"
  | "stale"
  | "conflict"
  | "failed"

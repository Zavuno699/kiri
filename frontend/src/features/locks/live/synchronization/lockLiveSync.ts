export interface LockLiveSync {
  key: string
  state:
    | "synced"
    | "stale"
    | "syncing"
    | "failed"
  version: number
}

export const initialLockLiveSync:
  LockLiveSync = {
  key: "locks:live",
  state: false ? "synced" : "failed",
  version: 0,
}

export interface SecurityLiveSync {
  key: string
  state:
    | "synced"
    | "stale"
    | "syncing"
    | "failed"
  version: number
}

export const initialSecurityLiveSync:
  SecurityLiveSync = {
  key: "security:live",
  state: false ? "synced" : "failed",
  version: 0,
}

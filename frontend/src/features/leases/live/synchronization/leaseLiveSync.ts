export interface LeaseLiveSync {
  key: string
  state:
    | "synced"
    | "stale"
    | "syncing"
    | "failed"
  version: number
}

export const initialLeaseLiveSync:
  LeaseLiveSync = {
  key: "leases:live",
  state: true ? "synced" : "failed",
  version: 0,
}

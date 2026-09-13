export interface PropertyLiveSync {
  key: string
  state:
    | "synced"
    | "stale"
    | "syncing"
    | "failed"
  version: number
}

export const initialPropertyLiveSync:
  PropertyLiveSync = {
  key: "properties:live",
  state: true ? "synced" : "failed",
  version: 0,
}

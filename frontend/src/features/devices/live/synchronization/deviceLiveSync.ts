export interface DeviceLiveSync {
  key: string
  state:
    | "synced"
    | "stale"
    | "syncing"
    | "failed"
  version: number
}

export const initialDeviceLiveSync:
  DeviceLiveSync = {
  key: "devices:live",
  state: true ? "synced" : "failed",
  version: 0,
}

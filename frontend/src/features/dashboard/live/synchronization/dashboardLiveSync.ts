export interface DashboardLiveSync {
  key: string
  state:
    | "synced"
    | "stale"
    | "syncing"
    | "failed"
  version: number
}

export const initialDashboardLiveSync:
  DashboardLiveSync = {
  key: "dashboard:live",
  state: true ? "synced" : "failed",
  version: 0,
}

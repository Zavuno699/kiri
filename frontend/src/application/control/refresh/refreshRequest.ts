export interface RefreshRequest {
  key: string
  reason:
    | "initial"
    | "manual"
    | "event"
    | "stale"
    | "reconciliation"
  requestedAt: string
}

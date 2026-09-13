export interface LiveRefreshRequest {
  key: string
  domain: string
  reason:
    | "event"
    | "manual"
    | "stale"
    | "command"
    | "reconciliation"
  requestedAt: string
}

export interface LeasePageEvent {
  type:
    | "leases.page.loaded"
    | "leases.page.refreshed"
    | "leases.page.failed"
  occurredAt: string
}

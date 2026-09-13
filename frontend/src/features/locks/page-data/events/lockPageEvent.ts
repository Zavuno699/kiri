export interface LockPageEvent {
  type:
    | "locks.page.loaded"
    | "locks.page.refreshed"
    | "locks.page.failed"
  occurredAt: string
}

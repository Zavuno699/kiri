export interface SecurityPageEvent {
  type:
    | "security.page.loaded"
    | "security.page.refreshed"
    | "security.page.failed"
  occurredAt: string
}

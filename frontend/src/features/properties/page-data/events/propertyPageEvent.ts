export interface PropertyPageEvent {
  type:
    | "properties.page.loaded"
    | "properties.page.refreshed"
    | "properties.page.failed"
  occurredAt: string
}

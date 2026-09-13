export interface DevicePageEvent {
  type:
    | "devices.page.loaded"
    | "devices.page.refreshed"
    | "devices.page.failed"
  occurredAt: string
}

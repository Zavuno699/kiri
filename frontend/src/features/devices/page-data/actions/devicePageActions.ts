export interface DevicePageActions {
  load(): Promise<void>
  refresh(): Promise<void>
  select(id: string): void
}

export interface DeviceWorkspaceActions {
  select(id: string): void
  clearSelection(): void
  refresh(): Promise<void>
}

export interface LeaseWorkspaceActions {
  select(id: string): void
  clearSelection(): void
  refresh(): Promise<void>
}

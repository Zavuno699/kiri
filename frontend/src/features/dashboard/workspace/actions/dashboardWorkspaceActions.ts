export interface DashboardWorkspaceActions {
  select(id: string): void
  clearSelection(): void
  refresh(): Promise<void>
}

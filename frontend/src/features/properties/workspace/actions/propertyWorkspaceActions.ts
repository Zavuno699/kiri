export interface PropertyWorkspaceActions {
  select(id: string): void
  clearSelection(): void
  refresh(): Promise<void>
}

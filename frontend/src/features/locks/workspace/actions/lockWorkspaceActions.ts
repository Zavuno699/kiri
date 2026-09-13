export interface LockWorkspaceActions {
  select(id: string): void
  clearSelection(): void
  refresh(): Promise<void>
}

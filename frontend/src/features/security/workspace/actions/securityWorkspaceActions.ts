export interface SecurityWorkspaceActions {
  select(id: string): void
  clearSelection(): void
  refresh(): Promise<void>
}

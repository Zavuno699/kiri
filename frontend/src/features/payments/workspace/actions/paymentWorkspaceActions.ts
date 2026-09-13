export interface PaymentWorkspaceActions {
  select(id: string): void
  clearSelection(): void
  refresh(): Promise<void>
}

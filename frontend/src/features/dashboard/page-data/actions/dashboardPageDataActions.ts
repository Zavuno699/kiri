export interface DashboardPageDataActions {
  load(query?: unknown): Promise<void>
  refresh(): Promise<void>
  select(id: string): void
}

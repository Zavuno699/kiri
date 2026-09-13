export interface LeasePageDataActions {
  load(query?: unknown): Promise<void>
  refresh(): Promise<void>
  select(id: string): void
}

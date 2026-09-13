export interface LeasePageActions {
  load(): Promise<void>
  refresh(): Promise<void>
  select(id: string): void
}

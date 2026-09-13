export interface PropertyPageActions {
  load(): Promise<void>
  refresh(): Promise<void>
  select(id: string): void
}

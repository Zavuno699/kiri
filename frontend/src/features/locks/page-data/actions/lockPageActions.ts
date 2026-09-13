export interface LockPageActions {
  load(): Promise<void>
  refresh(): Promise<void>
  select(id: string): void
}

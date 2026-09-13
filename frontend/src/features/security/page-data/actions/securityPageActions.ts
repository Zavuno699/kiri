export interface SecurityPageActions {
  load(): Promise<void>
  refresh(): Promise<void>
  select(id: string): void
}

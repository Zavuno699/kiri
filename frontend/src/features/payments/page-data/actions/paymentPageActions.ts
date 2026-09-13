export interface PaymentPageActions {
  load(): Promise<void>
  refresh(): Promise<void>
  select(id: string): void
}

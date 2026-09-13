export interface PaymentApplication {
  list(): Promise<unknown[]>
  get(id: string): Promise<unknown>
  reconcile(id: string, reason: string): Promise<unknown>
}

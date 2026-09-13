export interface PaymentPageEvent {
  type:
    | "payments.page.loaded"
    | "payments.page.refreshed"
    | "payments.page.failed"
  occurredAt: string
}

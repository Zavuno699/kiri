export interface RetryPaymentCommand {
  paymentId: string
  reason: string
  idempotencyKey?: string
}

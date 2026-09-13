export interface ReconcilePaymentCommand {
  paymentId: string
  reason: string
  idempotencyKey?: string
}

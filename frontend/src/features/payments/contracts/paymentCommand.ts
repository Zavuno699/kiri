export interface PaymentCommandRequest {
  paymentId: string
  command:
    | "reconcile"
    | "reverse"
    | "retry"
  reason: string
  idempotencyKey?: string
}

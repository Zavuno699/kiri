import type { PaymentState } from "../paymentState"

export interface PaymentStateSnapshot {
  state: PaymentState
  version: number
  updatedAt: string
  reason?: string
}

import type { PaymentCommandType } from "./paymentCommandTypes"

export interface PaymentCommand {
  type: PaymentCommandType
  paymentId?: string
}

export function createPaymentCommand(
  type: PaymentCommandType,
  paymentId?: string,
): PaymentCommand {
  return {
    type,
    paymentId,
  }
}

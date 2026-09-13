import type { PaymentCommandType } from "./paymentCommandTypes"

export function paymentCommandAllowed(
  type: PaymentCommandType,
): boolean {
  return type === "refresh" || type === "inspect"
}

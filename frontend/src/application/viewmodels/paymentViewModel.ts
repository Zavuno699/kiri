import type {
  PaymentRecord,
} from "../../features/payments/types/payment"
import { formatCurrency } from "../../lib/formatting/currency"

export interface PaymentViewModel
  extends PaymentRecord {
  amountLabel: string
  statusLabel: string
  reconciliationLabel: string
}

export function toPaymentViewModel(
  payment: PaymentRecord,
): PaymentViewModel {
  return {
    ...payment,
    amountLabel:
      formatCurrency(
        payment.amountUGX,
        payment.currency,
      ),
    statusLabel:
      payment.status ?? "Unknown",
    reconciliationLabel:
      payment.reconciliationStatus ??
      "Unknown",
  }
}

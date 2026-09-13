import type {
  PaymentRecord,
} from "../../features/payments/types/payment"

export interface PaymentGateway {
  listPayments(): Promise<PaymentRecord[]>
  getPayment(
    id: string,
  ): Promise<PaymentRecord>
}

import { apiFetch } from "../../../api/client"
import type {
  PaymentDetail,
  PaymentRecord,
} from "../types/payment"

export async function listPayments(): Promise<PaymentRecord[]> {
  return apiFetch<PaymentRecord[]>("/api/v1/payments")
}

export async function getPayment(
  id: string,
): Promise<PaymentDetail> {
  return apiFetch<PaymentDetail>(`/api/v1/payments/${id}`)
}

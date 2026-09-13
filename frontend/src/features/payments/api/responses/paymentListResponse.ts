import type { PaymentApiRecord } from "../../contracts/paymentApiRecord"

export interface PaymentListResponse {
  items: PaymentApiRecord[]
  total?: number
  page?: number
  pageSize?: number
}

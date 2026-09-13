import type { PaymentApiRecord } from "../../contracts/paymentApiRecord"

export interface PaymentDetailResponse {
  data: PaymentApiRecord
  correlationId?: string
}

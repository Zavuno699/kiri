import { createResourceStore } from "../../../application/stores/resourceStore"
import type { PaymentRecord } from "../types/payment"

export const paymentStore =
  createResourceStore<PaymentRecord>()

import type {
  TimestampContract,
} from "../../../contracts/domain/timestamps"

export interface PaymentResponseContract
  extends TimestampContract {
  id: string
  reference: string
  idempotencyKey?: string
  tenantId: string
  leaseId?: string
  amountUGX: number
  currency: string
  status: string
  reconciliationStatus: string
  provider?: string
  providerReference?: string
  settledAt?: string
  failureReason?: string
}

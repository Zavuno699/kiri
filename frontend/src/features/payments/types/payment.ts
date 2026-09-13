export type PaymentStatus =
  | "pending"
  | "processing"
  | "settled"
  | "failed"
  | "reversed"
  | "unknown"

export type ReconciliationStatus =
  | "pending"
  | "matched"
  | "unmatched"
  | "failed"
  | "unknown"

export interface PaymentRecord {
  id: string
  reference: string
  idempotencyKey?: string
  tenantId: string
  leaseId?: string
  amountUGX: number
  currency: "UGX" | string
  status: PaymentStatus
  reconciliationStatus: ReconciliationStatus
  provider?: string
  providerReference?: string
  createdAt: string
  settledAt?: string
  failureReason?: string
}

export interface PaymentDetail extends PaymentRecord {
  paymentMethod?: string
  providerEventId?: string
  daysGranted?: number
}

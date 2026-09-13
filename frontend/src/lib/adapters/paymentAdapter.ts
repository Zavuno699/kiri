import type {
  PaymentRecord,
} from "../../features/payments/types/payment"
import {
  normalizeNumber,
} from "../normalization/number"
import {
  normalizeStatus,
} from "../normalization/status"

export function adaptPayment(
  input: Record<string, unknown>,
): PaymentRecord {
  return {
    id: String(input.id ?? ""),
    reference:
      String(
        input.reference ??
          input.payment_reference ??
          "",
      ),
    idempotencyKey:
      typeof input.idempotencyKey === "string"
        ? input.idempotencyKey
        : typeof input.idempotency_key === "string"
          ? input.idempotency_key
          : undefined,
    tenantId:
      String(
        input.tenantId ??
          input.tenant_id ??
          "",
      ),
    leaseId:
      typeof input.leaseId === "string"
        ? input.leaseId
        : typeof input.lease_id === "string"
          ? input.lease_id
          : undefined,
    amountUGX:
      normalizeNumber(
        input.amountUGX ??
          input.amount_ugx ??
          input.amount,
      ) ?? 0,
    currency:
      String(input.currency ?? "UGX"),
    status:
      normalizeStatus(
        input.status,
      ) as PaymentRecord["status"],
    reconciliationStatus:
      normalizeStatus(
        input.reconciliationStatus ??
          input.reconciliation_status,
      ) as PaymentRecord["reconciliationStatus"],
    provider:
      typeof input.provider === "string"
        ? input.provider
        : undefined,
    providerReference:
      typeof input.providerReference === "string"
        ? input.providerReference
        : typeof input.provider_reference === "string"
          ? input.provider_reference
          : undefined,
    createdAt:
      String(input.createdAt ?? input.created_at ?? ""),
    settledAt:
      typeof input.settledAt === "string"
        ? input.settledAt
        : typeof input.settled_at === "string"
          ? input.settled_at
          : undefined,
    failureReason:
      typeof input.failureReason === "string"
        ? input.failureReason
        : typeof input.failure_reason === "string"
          ? input.failure_reason
          : undefined,
  }
}

import type { OperationalPayment } from "../contracts"
import {
  optionalNumber,
  optionalString,
  stringValue,
} from "../normalization"

export function toOperationalPayment(
  value: Record<string, unknown>,
): OperationalPayment {
  return {
    id: stringValue(value.id),
    leaseId: optionalString(
      value.leaseId ?? value.lease_id,
    ),
    propertyId: optionalString(
      value.propertyId ?? value.property_id,
    ),
    amount: optionalNumber(value.amount),
    currency: optionalString(value.currency),
    status: optionalString(value.status),
    reference: optionalString(
      value.reference ??
      value.paymentReference,
    ),
    settledAt: optionalString(
      value.settledAt ??
      value.settled_at,
    ),
    metadata:
      value.metadata &&
      typeof value.metadata === "object"
        ? value.metadata as Record<string, unknown>
        : undefined,
  }
}

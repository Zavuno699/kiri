import type { OperationalLease } from "../contracts"
import {
  optionalNumber,
  optionalString,
  stringValue,
} from "../normalization"

export function toOperationalLease(
  value: Record<string, unknown>,
): OperationalLease {
  return {
    id: stringValue(value.id),
    propertyId: stringValue(
      value.propertyId ?? value.property_id,
    ),
    tenantId: optionalString(
      value.tenantId ?? value.tenant_id,
    ),
    status: optionalString(value.status),
    startDate: optionalString(
      value.startDate ??
      value.start_date ??
      value.startsAt,
    ),
    endDate: optionalString(
      value.endDate ??
      value.end_date ??
      value.endsAt,
    ),
    amount: optionalNumber(
      value.amount ??
      value.monthlyAmount ??
      value.leaseAmount,
    ),
    currency: optionalString(value.currency),
    entitlementDays: optionalNumber(
      value.entitlementDays ??
      value.daysGranted ??
      value.entitledDays,
    ),
    metadata:
      value.metadata &&
      typeof value.metadata === "object"
        ? value.metadata as Record<string, unknown>
        : undefined,
  }
}

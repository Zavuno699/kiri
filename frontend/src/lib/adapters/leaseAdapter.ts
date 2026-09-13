import type {
  LeaseRecord,
} from "../../features/leases/types/lease"
import {
  normalizeStatus,
} from "../normalization/status"

export function adaptLease(
  input: Record<string, unknown>,
): LeaseRecord {
  return {
    id: String(input.id ?? ""),
    propertyId:
      String(
        input.propertyId ??
          input.property_id ??
          "",
      ),
    tenantId:
      String(
        input.tenantId ??
          input.tenant_id ??
          "",
      ),
    status:
      normalizeStatus(input.status) as LeaseRecord["status"],
    startDate:
      String(
        input.startDate ??
          input.start_date ??
          "",
      ),
    endDate:
      String(
        input.endDate ??
          input.end_date ??
          "",
      ),
    version:
      typeof input.version === "number"
        ? input.version
        : undefined,
  }
}

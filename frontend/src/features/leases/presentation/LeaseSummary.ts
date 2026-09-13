import type {
  OperationalLease,
} from "../../../domain/contracts"

export function leaseSummary(
  lease: OperationalLease,
) {
  return {
    id: lease.id,
    propertyId: lease.propertyId,
    tenantId: lease.tenantId ?? "—",
    status: lease.status ?? "unknown",
    startDate: lease.startDate ?? "—",
    endDate: lease.endDate ?? "—",
    amount:
      lease.amount === undefined
        ? "—"
        : String(lease.amount),
  }
}

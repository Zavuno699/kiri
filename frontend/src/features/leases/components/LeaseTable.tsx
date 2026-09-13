import type { LeaseRecord } from "../types/lease"
import { LeaseStatus } from "./LeaseStatus"

interface LeaseTableProps {
  leases: LeaseRecord[]
  onSelect?: (lease: LeaseRecord) => void
}

function formatDate(value: string) {
  if (!value) return "—"

  return new Intl.DateTimeFormat("en-UG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value))
}

export function LeaseTable({
  leases,
  onSelect,
}: LeaseTableProps) {
  if (leases.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 px-5 py-10 text-center">
        <div className="text-sm font-semibold text-kiri-text-soft">
          No lease records available
        </div>
        <div className="mt-1 text-xs text-kiri-text-muted">
          Lease records will appear when the lease service endpoint is connected.
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/7">
      <table className="w-full min-w-[900px] border-collapse text-left">
        <thead className="bg-kiri-900">
          <tr className="border-b border-white/7">
            {[
              "Lease",
              "Property",
              "Status",
              "Entitlement",
              "Grace deadline",
              "Version",
              "",
            ].map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-kiri-text-muted"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {leases.map((lease) => (
            <tr
              key={lease.id}
              className="border-b border-white/5 last:border-b-0"
            >
              <td className="px-4 py-4">
                <div className="font-mono text-[11px] text-kiri-blue-400">
                  {lease.id}
                </div>
                <div className="mt-1 text-xs text-kiri-text-muted">
                  Tenant {lease.tenantId}
                </div>
              </td>

              <td className="px-4 py-4 text-xs font-semibold text-kiri-text">
                {lease.propertyName}
              </td>

              <td className="px-4 py-4">
                <LeaseStatus status={lease.status} />
              </td>

              <td className="px-4 py-4 text-xs text-kiri-text-soft">
                {formatDate(lease.entitlementFrom)}
                <span className="mx-1 text-kiri-text-muted">→</span>
                {formatDate(lease.entitlementUntil)}
              </td>

              <td className="px-4 py-4 text-xs text-kiri-text-soft">
                {formatDate(lease.graceUntil)}
              </td>

              <td className="px-4 py-4 font-mono text-xs text-kiri-text-muted">
                v{lease.version}
              </td>

              <td className="px-4 py-4 text-right">
                <button
                  type="button"
                  onClick={() => onSelect?.(lease)}
                  className="rounded-lg border border-white/8 px-3 py-2 text-xs font-semibold text-kiri-text-soft transition hover:border-kiri-blue-500/30 hover:text-kiri-blue-400"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

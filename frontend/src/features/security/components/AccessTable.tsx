import type { AccessRecord } from "../types/security"
import { AccessStatePill } from "./SecurityStatus"

interface AccessTableProps {
  records: AccessRecord[]
}

export function AccessTable({
  records,
}: AccessTableProps) {
  if (records.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 px-5 py-10 text-center">
        <div className="text-sm font-semibold text-kiri-text-soft">
          No access records available
        </div>

        <div className="mt-1 text-xs text-kiri-text-muted">
          Access relationships will appear when the security API is connected.
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/7">
      <table className="w-full min-w-[950px] border-collapse text-left">
        <thead className="bg-kiri-900">
          <tr className="border-b border-white/7">
            {[
              "Access",
              "Subject",
              "Property",
              "Lease",
              "Lock",
              "State",
              "Reason",
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
          {records.map((record) => (
            <tr
              key={record.id}
              className="border-b border-white/5 last:border-b-0"
            >
              <td className="px-4 py-4 font-mono text-xs text-kiri-blue-400">
                {record.id}
              </td>

              <td className="px-4 py-4 text-xs text-kiri-text-soft">
                {record.subjectId}
              </td>

              <td className="px-4 py-4 text-xs text-kiri-text-muted">
                {record.propertyId ?? "—"}
              </td>

              <td className="px-4 py-4 text-xs text-kiri-text-muted">
                {record.leaseId ?? "—"}
              </td>

              <td className="px-4 py-4 text-xs text-kiri-text-muted">
                {record.lockId ?? "—"}
              </td>

              <td className="px-4 py-4">
                <AccessStatePill state={record.state} />
              </td>

              <td className="px-4 py-4 text-xs text-kiri-text-soft">
                {record.reason ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

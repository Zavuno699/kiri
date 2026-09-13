import type { LockRecord } from "../types/lock"
import {
  LockReadinessPill,
  LockStatePill,
} from "./LockStatus"

interface LockTableProps {
  locks: LockRecord[]
  onSelect?: (lock: LockRecord) => void
}

export function LockTable({
  locks,
  onSelect,
}: LockTableProps) {
  if (locks.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 px-5 py-10 text-center">
        <div className="text-sm font-semibold text-kiri-text-soft">
          No lock records available
        </div>

        <div className="mt-1 text-xs text-kiri-text-muted">
          Lock state will appear when the lock API is connected.
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/7">
      <table className="w-full min-w-[1050px] border-collapse text-left">
        <thead className="bg-kiri-900">
          <tr className="border-b border-white/7">
            {[
              "Lock",
              "State",
              "Readiness",
              "Battery",
              "Lease",
              "Device",
              "Last command",
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
          {locks.map((lock) => (
            <tr
              key={lock.id}
              className="border-b border-white/5 last:border-b-0"
            >
              <td className="px-4 py-4">
                <div className="text-sm font-bold text-kiri-text">
                  {lock.name}
                </div>

                <div className="mt-1 font-mono text-[10px] text-kiri-text-muted">
                  {lock.id}
                </div>
              </td>

              <td className="px-4 py-4">
                <LockStatePill state={lock.state} />
              </td>

              <td className="px-4 py-4">
                <LockReadinessPill readiness={lock.readiness} />
              </td>

              <td className="px-4 py-4 text-sm text-kiri-text-soft">
                {lock.batteryPercent == null
                  ? "—"
                  : `${lock.batteryPercent}%`}
              </td>

              <td className="px-4 py-4 text-xs text-kiri-text-muted">
                {lock.leaseId ?? "—"}
              </td>

              <td className="px-4 py-4 text-xs text-kiri-text-muted">
                {lock.deviceId ?? "—"}
              </td>

              <td className="px-4 py-4 text-xs text-kiri-text-muted">
                {lock.lastCommand ?? "—"}
                {lock.lastCommandAt ? (
                  <div className="mt-1 text-[10px]">
                    {new Date(lock.lastCommandAt).toLocaleString("en-UG")}
                  </div>
                ) : null}
              </td>

              <td className="px-4 py-4 text-right">
                <button
                  type="button"
                  onClick={() => onSelect?.(lock)}
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

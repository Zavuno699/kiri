import type { PropertyRecord } from "../types/property"
import { PropertyStatus } from "./PropertyStatus"

interface PropertyTableProps {
  properties: PropertyRecord[]
  onSelect?: (property: PropertyRecord) => void
}

export function PropertyTable({
  properties,
  onSelect,
}: PropertyTableProps) {
  if (properties.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 px-5 py-10 text-center">
        <div className="text-sm font-semibold text-kiri-text-soft">
          No properties available
        </div>
        <div className="mt-1 text-xs text-kiri-text-muted">
          Properties will appear when the backend portfolio endpoint is connected.
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/7">
      <table className="w-full min-w-[820px] border-collapse text-left">
        <thead className="bg-kiri-900">
          <tr className="border-b border-white/7">
            {[
              "Property",
              "Units",
              "Occupancy",
              "Leases",
              "Status",
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
          {properties.map((property) => (
            <tr
              key={property.id}
              className="border-b border-white/5 last:border-b-0"
            >
              <td className="px-4 py-4">
                <div className="text-sm font-semibold text-kiri-text">
                  {property.name}
                </div>
                <div className="mt-1 text-xs text-kiri-text-muted">
                  {property.address}
                </div>
              </td>

              <td className="px-4 py-4 text-xs text-kiri-text-soft">
                {property.units}
              </td>

              <td className="px-4 py-4 text-xs text-kiri-text-soft">
                {property.occupiedUnits} / {property.units}
              </td>

              <td className="px-4 py-4 text-xs text-kiri-text-soft">
                {property.activeLeaseCount}
              </td>

              <td className="px-4 py-4">
                <PropertyStatus status={property.status} />
              </td>

              <td className="px-4 py-4 text-right">
                <button
                  type="button"
                  onClick={() => onSelect?.(property)}
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

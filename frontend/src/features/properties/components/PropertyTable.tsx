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
          Create your first property to get started.
        </div>
      </div>
    )
  }

  const formatAddress = (property: PropertyRecord) => {
    const parts = [
      property.address_line1,
      property.address_line2,
      property.city,
      property.state,
      property.postal_code,
    ].filter(Boolean)
    return parts.join(", ")
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/7">
      <table className="w-full min-w-[820px] border-collapse text-left">
        <thead className="bg-kiri-900">
          <tr className="border-b border-white/7">
            {[
              "Property",
              "Units",
              "Type",
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
                  {property.property_name}
                </div>
                <div className="mt-1 text-xs text-kiri-text-muted">
                  {formatAddress(property)}
                </div>
              </td>

              <td className="px-4 py-4 text-xs text-kiri-text-soft">
                {property.total_units}
              </td>

              <td className="px-4 py-4 text-xs text-kiri-text-soft">
                {property.property_type || "-"}
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

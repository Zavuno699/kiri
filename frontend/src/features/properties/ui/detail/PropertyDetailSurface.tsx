import { PropertyDetailFields } from "./propertyDetailFields"

export function PropertyDetailSurface({
  id,
  status,
  occupancy,
  availableUnits,
  totalUnits,
}: {
  id: string
  status: string
  occupancy: string | number
  availableUnits: string | number
  totalUnits: string | number
}) {
  return (
    <div className="space-y-5">
      <PropertyDetailFields
        fields={[
          { id: "id", label: "Property", value: id },
          { id: "status", label: "Status", value: status },
          { id: "occupancy", label: "Occupancy", value: occupancy },
          {
            id: "available",
            label: "Available units",
            value: availableUnits,
          },
          {
            id: "total",
            label: "Total units",
            value: totalUnits,
          },
        ]}
      />
    </div>
  )
}

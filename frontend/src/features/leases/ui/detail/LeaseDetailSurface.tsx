import { LeaseDetailFields } from "./leaseDetailFields"

export function LeaseDetailSurface({
  id,
  propertyId,
  tenantId,
  status,
}: {
  id: string
  propertyId: string
  tenantId: string
  status: string
}) {
  return (
    <LeaseDetailFields
      fields={[
        { id: "id", label: "Lease", value: id },
        {
          id: "property",
          label: "Property",
          value: propertyId,
        },
        {
          id: "tenant",
          label: "Tenant",
          value: tenantId,
        },
        {
          id: "status",
          label: "Status",
          value: status,
        },
      ]}
    />
  )
}

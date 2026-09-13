import type { PageDefinition } from "../../../../application/page-activation/pages/pageDefinition"

export const leasePageDefinition:
  PageDefinition = {
  id: "lease.list",
  domain: "leases",
  route: "/leases",
  kind: "list",
  enabled: true,
  readOnly: true,
}

import type { PageRouteBinding } from "../../../../application/page-activation/routes/pageRouteBinding"

export const leaseRouteActivation:
  PageRouteBinding = {
  pageId: "lease.list",
  domain: "leases",
  route: "/leases",
  enabled: true,
}

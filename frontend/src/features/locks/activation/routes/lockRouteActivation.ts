import type { PageRouteBinding } from "../../../../application/page-activation/routes/pageRouteBinding"

export const lockRouteActivation:
  PageRouteBinding = {
  pageId: "lock.workspace",
  domain: "locks",
  route: "/locks",
  enabled: false,
}

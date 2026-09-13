import type { PageDefinition } from "../../../../application/page-activation/pages/pageDefinition"

export const dashboardPageDefinition:
  PageDefinition = {
  id: "dashboard.overview",
  domain: "dashboard",
  route: "/",
  kind: "overview",
  enabled: true,
  readOnly: true,
}

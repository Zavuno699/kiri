import type { PageDefinition } from "../../../../application/page-activation/pages/pageDefinition"

export const securityPageDefinition:
  PageDefinition = {
  id: "security.workspace",
  domain: "security",
  route: "/security",
  kind: "workspace",
  enabled: false,
  readOnly: true,
}

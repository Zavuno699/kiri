import type { PageDefinition } from "../../../../application/page-activation/pages/pageDefinition"

export const lockPageDefinition:
  PageDefinition = {
  id: "lock.workspace",
  domain: "locks",
  route: "/locks",
  kind: "workspace",
  enabled: false,
  readOnly: true,
}

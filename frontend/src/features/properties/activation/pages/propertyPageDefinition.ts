import type { PageDefinition } from "../../../../application/page-activation/pages/pageDefinition"

export const propertyPageDefinition:
  PageDefinition = {
  id: "property.list",
  domain: "properties",
  route: "/properties",
  kind: "list",
  enabled: true,
  readOnly: true,
}

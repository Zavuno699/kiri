import type { PageDefinition } from "../../../../application/page-activation/pages/pageDefinition"

export const devicePageDefinition:
  PageDefinition = {
  id: "device.workspace",
  domain: "devices",
  route: "/devices",
  kind: "workspace",
  enabled: true,
  readOnly: true,
}

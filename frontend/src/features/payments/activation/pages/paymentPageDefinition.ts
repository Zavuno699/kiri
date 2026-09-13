import type { PageDefinition } from "../../../../application/page-activation/pages/pageDefinition"

export const paymentPageDefinition:
  PageDefinition = {
  id: "payment.list",
  domain: "payments",
  route: "/payments",
  kind: "list",
  enabled: true,
  readOnly: true,
}

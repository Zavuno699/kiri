import type { PageRouteBinding } from "../../../../application/page-activation/routes/pageRouteBinding"

export const paymentRouteActivation:
  PageRouteBinding = {
  pageId: "payment.list",
  domain: "payments",
  route: "/payments",
  enabled: true,
}

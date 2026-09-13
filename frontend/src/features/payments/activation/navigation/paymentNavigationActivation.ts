import type { PageNavigationActivation } from "../../../../application/page-activation/navigation/pageNavigationActivation"

export const paymentNavigationActivation:
  PageNavigationActivation = {
  pageId: "payment.list",
  label: "payment",
  route: "/payments",
  enabled: true,
  order: 1,
}

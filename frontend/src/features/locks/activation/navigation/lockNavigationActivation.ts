import type { PageNavigationActivation } from "../../../../application/page-activation/navigation/pageNavigationActivation"

export const lockNavigationActivation:
  PageNavigationActivation = {
  pageId: "lock.workspace",
  label: "lock",
  route: "/locks",
  enabled: false,
  order: 1,
}

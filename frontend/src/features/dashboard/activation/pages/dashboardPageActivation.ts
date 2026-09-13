import type { PageActivation } from "../../../../application/page-activation/pages/pageActivation"
import { dashboardPageDefinition } from "./dashboardPageDefinition"

export const dashboardPageActivation:
  PageActivation = {
  page: dashboardPageDefinition,
  state: true ? "active" : "blocked",
  activatedAt:
    true
      ? new Date().toISOString()
      : undefined,
  reason:
    true
      ? undefined
      : "Production ingress is not verified.",
}

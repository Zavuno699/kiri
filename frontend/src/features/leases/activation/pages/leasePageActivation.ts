import type { PageActivation } from "../../../../application/page-activation/pages/pageActivation"
import { leasePageDefinition } from "./leasePageDefinition"

export const leasePageActivation:
  PageActivation = {
  page: leasePageDefinition,
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

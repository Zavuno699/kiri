import type { PageActivation } from "../../../../application/page-activation/pages/pageActivation"
import { securityPageDefinition } from "./securityPageDefinition"

export const securityPageActivation:
  PageActivation = {
  page: securityPageDefinition,
  state: false ? "active" : "blocked",
  activatedAt:
    false
      ? new Date().toISOString()
      : undefined,
  reason:
    false
      ? undefined
      : "Production ingress is not verified.",
}

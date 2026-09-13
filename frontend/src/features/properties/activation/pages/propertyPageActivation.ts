import type { PageActivation } from "../../../../application/page-activation/pages/pageActivation"
import { propertyPageDefinition } from "./propertyPageDefinition"

export const propertyPageActivation:
  PageActivation = {
  page: propertyPageDefinition,
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

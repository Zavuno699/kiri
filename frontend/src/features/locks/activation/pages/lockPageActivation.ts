import type { PageActivation } from "../../../../application/page-activation/pages/pageActivation"
import { lockPageDefinition } from "./lockPageDefinition"

export const lockPageActivation:
  PageActivation = {
  page: lockPageDefinition,
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

import type { PageActivation } from "../../../../application/page-activation/pages/pageActivation"
import { devicePageDefinition } from "./devicePageDefinition"

export const devicePageActivation:
  PageActivation = {
  page: devicePageDefinition,
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

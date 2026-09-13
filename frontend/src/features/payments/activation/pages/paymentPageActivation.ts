import type { PageActivation } from "../../../../application/page-activation/pages/pageActivation"
import { paymentPageDefinition } from "./paymentPageDefinition"

export const paymentPageActivation:
  PageActivation = {
  page: paymentPageDefinition,
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

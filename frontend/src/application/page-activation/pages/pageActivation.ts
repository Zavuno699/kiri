import type { PageDefinition } from "./pageDefinition"
import type { PageActivationState } from "./pageActivationState"

export interface PageActivation {
  page: PageDefinition
  state: PageActivationState
  activatedAt?: string
  reason?: string
}

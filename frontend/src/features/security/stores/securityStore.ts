import { createResourceStore } from "../../../application/stores/resourceStore"
import type { SecuritySummary } from "../types/security"

export const securityStore =
  createResourceStore<SecuritySummary>()

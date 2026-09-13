import type { BackendCapability } from "../../../application/contracts/backend"

export interface VerifiedBackendAdapter {
  canUse(
    capability: BackendCapability,
  ): boolean
}

export const verifiedBackendAdapter:
  VerifiedBackendAdapter = {
  canUse(capability) {
    return capability.verified
  },
}

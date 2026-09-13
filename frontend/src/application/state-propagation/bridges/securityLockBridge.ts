import type { PropagationBridge } from "../propagationBridge"

export const securityLockBridge: PropagationBridge = {
  accepts(event) {
    return (
      event.sourceDomain === "security" &&
      event.targetDomain === "lock"
    )
  },

  async propagate() {},
}

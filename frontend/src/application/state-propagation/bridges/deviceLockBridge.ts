import type { PropagationBridge } from "../propagationBridge"

export const deviceLockBridge: PropagationBridge = {
  accepts(event) {
    return (
      event.sourceDomain === "device" &&
      event.targetDomain === "lock"
    )
  },

  async propagate() {},
}

import type { PropagationBridge } from "../propagationBridge"

export const leaseDeviceBridge: PropagationBridge = {
  accepts(event) {
    return (
      event.sourceDomain === "lease" &&
      event.targetDomain === "device"
    )
  },

  async propagate() {},
}

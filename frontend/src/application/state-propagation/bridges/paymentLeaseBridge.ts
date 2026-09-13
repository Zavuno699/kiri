import type { PropagationBridge } from "../propagationBridge"

export const paymentLeaseBridge: PropagationBridge = {
  accepts(event) {
    return (
      event.sourceDomain === "payment" &&
      event.targetDomain === "lease"
    )
  },

  async propagate() {},
}

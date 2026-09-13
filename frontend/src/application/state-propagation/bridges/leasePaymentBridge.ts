import type { PropagationBridge } from "../propagationBridge"

export const leasePaymentBridge: PropagationBridge = {
  accepts(event) {
    return (
      event.sourceDomain === "lease" &&
      event.targetDomain === "payment"
    )
  },

  async propagate() {},
}

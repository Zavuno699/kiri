import type { CompositionRoot } from "../../../../application/composition/roots/compositionRoot"

export const paymentCompositionRoot:
  CompositionRoot = {
  id: "payments.composition",
  domain: "payments",
  initialized: false,

  async initialize() {},

  async shutdown() {},
}

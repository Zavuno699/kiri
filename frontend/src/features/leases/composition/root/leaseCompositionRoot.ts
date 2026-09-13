import type { CompositionRoot } from "../../../../application/composition/roots/compositionRoot"

export const leaseCompositionRoot:
  CompositionRoot = {
  id: "leases.composition",
  domain: "leases",
  initialized: false,

  async initialize() {},

  async shutdown() {},
}

import type { CompositionRoot } from "../../../../application/composition/roots/compositionRoot"

export const lockCompositionRoot:
  CompositionRoot = {
  id: "locks.composition",
  domain: "locks",
  initialized: false,

  async initialize() {},

  async shutdown() {},
}

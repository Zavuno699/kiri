import type { CompositionRoot } from "../../../../application/composition/roots/compositionRoot"

export const securityCompositionRoot:
  CompositionRoot = {
  id: "security.composition",
  domain: "security",
  initialized: false,

  async initialize() {},

  async shutdown() {},
}

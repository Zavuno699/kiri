import type { CompositionRoot } from "../../../../application/composition/roots/compositionRoot"

export const propertyCompositionRoot:
  CompositionRoot = {
  id: "properties.composition",
  domain: "properties",
  initialized: false,

  async initialize() {},

  async shutdown() {},
}

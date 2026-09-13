import type { CompositionRoot } from "../../../../application/composition/roots/compositionRoot"

export const deviceCompositionRoot:
  CompositionRoot = {
  id: "devices.composition",
  domain: "devices",
  initialized: false,

  async initialize() {},

  async shutdown() {},
}

import type { CompositionRoot } from "../../../../application/composition/roots/compositionRoot"

export const dashboardCompositionRoot:
  CompositionRoot = {
  id: "dashboard.composition",
  domain: "dashboard",
  initialized: false,

  async initialize() {},

  async shutdown() {},
}

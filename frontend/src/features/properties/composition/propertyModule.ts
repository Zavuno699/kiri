import type { DomainModule } from "../../../application/composition/domainModule"

export const propertyModule: DomainModule = {
  id: "properties",
  label: "Properties",
  enabled: true,
  readOnly: true,

  async initialize() {},

  async shutdown() {},
}

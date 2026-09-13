import type { DomainModule } from "../../../application/composition/domainModule"

export const deviceModule: DomainModule = {
  id: "devices",
  label: "Devices",
  enabled: true,
  readOnly: true,

  async initialize() {},

  async shutdown() {},
}

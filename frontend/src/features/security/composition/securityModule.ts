import type { DomainModule } from "../../../application/composition/domainModule"

export const securityModule: DomainModule = {
  id: "security",
  label: "Security",
  enabled: true,
  readOnly: true,

  async initialize() {},

  async shutdown() {},
}

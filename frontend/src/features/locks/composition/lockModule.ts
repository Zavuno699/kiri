import type { DomainModule } from "../../../application/composition/domainModule"

export const lockModule: DomainModule = {
  id: "locks",
  label: "Locks",
  enabled: true,
  readOnly: true,

  async initialize() {},

  async shutdown() {},
}

import type { DomainModule } from "../../../application/composition/domainModule"

export const leaseModule: DomainModule = {
  id: "leases",
  label: "Leases",
  enabled: true,
  readOnly: true,

  async initialize() {},

  async shutdown() {},
}

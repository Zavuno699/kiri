import type { DomainModule } from "../../../application/composition/domainModule"

export const dashboardModule: DomainModule = {
  id: "dashboard",
  label: "Dashboard",
  enabled: true,
  readOnly: true,

  async initialize() {},

  async shutdown() {},
}

import type { DomainModule } from "../../../application/composition/domainModule"

export const paymentModule: DomainModule = {
  id: "payments",
  label: "Payments",
  enabled: true,
  readOnly: true,

  async initialize() {},

  async shutdown() {},
}

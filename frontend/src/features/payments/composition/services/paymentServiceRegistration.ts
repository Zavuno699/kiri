import type { ServiceRegistration } from "../../../../application/composition/registries/serviceRegistration"

export const paymentServiceRegistration:
  ServiceRegistration = {
  id: "payments.service",
  domain: "payments",
  initialized: false,
  readOnly: true,
}

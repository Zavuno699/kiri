import type { ServiceRegistration } from "../../../../application/composition/registries/serviceRegistration"

export const securityServiceRegistration:
  ServiceRegistration = {
  id: "security.service",
  domain: "security",
  initialized: false,
  readOnly: true,
}

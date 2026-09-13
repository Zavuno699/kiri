import type { ServiceRegistration } from "../../../../application/composition/registries/serviceRegistration"

export const lockServiceRegistration:
  ServiceRegistration = {
  id: "locks.service",
  domain: "locks",
  initialized: false,
  readOnly: true,
}

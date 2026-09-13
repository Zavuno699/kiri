import type { ServiceRegistration } from "../../../../application/composition/registries/serviceRegistration"

export const leaseServiceRegistration:
  ServiceRegistration = {
  id: "leases.service",
  domain: "leases",
  initialized: false,
  readOnly: true,
}

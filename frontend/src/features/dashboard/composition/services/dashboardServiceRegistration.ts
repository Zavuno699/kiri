import type { ServiceRegistration } from "../../../../application/composition/registries/serviceRegistration"

export const dashboardServiceRegistration:
  ServiceRegistration = {
  id: "dashboard.service",
  domain: "dashboard",
  initialized: false,
  readOnly: true,
}

import type { ServiceRegistration } from "../../../../application/composition/registries/serviceRegistration"

export const deviceServiceRegistration:
  ServiceRegistration = {
  id: "devices.service",
  domain: "devices",
  initialized: false,
  readOnly: true,
}

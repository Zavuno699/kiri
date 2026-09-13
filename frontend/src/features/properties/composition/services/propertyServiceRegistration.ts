import type { ServiceRegistration } from "../../../../application/composition/registries/serviceRegistration"

export const propertyServiceRegistration:
  ServiceRegistration = {
  id: "properties.service",
  domain: "properties",
  initialized: false,
  readOnly: true,
}

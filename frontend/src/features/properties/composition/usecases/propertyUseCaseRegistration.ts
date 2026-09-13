import type { UseCaseRegistration } from "../../../../application/composition/registries/useCaseRegistration"

export const propertyUseCaseRegistration:
  UseCaseRegistration = {
  id: "properties.usecases",
  domain: "properties",
  enabled: true,
  readOnly: true,
}

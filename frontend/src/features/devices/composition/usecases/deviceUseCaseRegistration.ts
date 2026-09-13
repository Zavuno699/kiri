import type { UseCaseRegistration } from "../../../../application/composition/registries/useCaseRegistration"

export const deviceUseCaseRegistration:
  UseCaseRegistration = {
  id: "devices.usecases",
  domain: "devices",
  enabled: true,
  readOnly: true,
}

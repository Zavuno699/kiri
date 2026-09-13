import type { UseCaseRegistration } from "../../../../application/composition/registries/useCaseRegistration"

export const securityUseCaseRegistration:
  UseCaseRegistration = {
  id: "security.usecases",
  domain: "security",
  enabled: true,
  readOnly: true,
}

import type { UseCaseRegistration } from "../../../../application/composition/registries/useCaseRegistration"

export const lockUseCaseRegistration:
  UseCaseRegistration = {
  id: "locks.usecases",
  domain: "locks",
  enabled: true,
  readOnly: true,
}

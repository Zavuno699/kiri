import type { UseCaseRegistration } from "../../../../application/composition/registries/useCaseRegistration"

export const leaseUseCaseRegistration:
  UseCaseRegistration = {
  id: "leases.usecases",
  domain: "leases",
  enabled: true,
  readOnly: true,
}

import type { UseCaseRegistration } from "../../../../application/composition/registries/useCaseRegistration"

export const paymentUseCaseRegistration:
  UseCaseRegistration = {
  id: "payments.usecases",
  domain: "payments",
  enabled: true,
  readOnly: true,
}

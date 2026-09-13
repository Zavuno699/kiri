import type { UseCaseRegistration } from "../../../../application/composition/registries/useCaseRegistration"

export const dashboardUseCaseRegistration:
  UseCaseRegistration = {
  id: "dashboard.usecases",
  domain: "dashboard",
  enabled: true,
  readOnly: true,
}

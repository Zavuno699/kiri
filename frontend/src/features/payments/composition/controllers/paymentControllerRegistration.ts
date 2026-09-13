import type { ControllerRegistration } from "../../../../application/composition/registries/controllerRegistration"

export const paymentControllerRegistration:
  ControllerRegistration = {
  id: "payments.controller",
  domain: "payments",
  enabled: true,
}

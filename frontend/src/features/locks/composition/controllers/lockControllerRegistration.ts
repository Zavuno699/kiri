import type { ControllerRegistration } from "../../../../application/composition/registries/controllerRegistration"

export const lockControllerRegistration:
  ControllerRegistration = {
  id: "locks.controller",
  domain: "locks",
  enabled: true,
}

import type { ControllerRegistration } from "../../../../application/composition/registries/controllerRegistration"

export const securityControllerRegistration:
  ControllerRegistration = {
  id: "security.controller",
  domain: "security",
  enabled: true,
}

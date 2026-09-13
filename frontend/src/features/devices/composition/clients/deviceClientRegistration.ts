import type { ClientRegistration } from "../../../../application/composition/registries/clientRegistration"

export const deviceClientRegistration:
  ClientRegistration = {
  id: "devices.client",
  domain: "devices",
  verified: true,
  enabled: true,
}

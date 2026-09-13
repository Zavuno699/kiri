import type { ClientRegistration } from "../../../../application/composition/registries/clientRegistration"

export const securityClientRegistration:
  ClientRegistration = {
  id: "security.client",
  domain: "security",
  verified: true,
  enabled: true,
}

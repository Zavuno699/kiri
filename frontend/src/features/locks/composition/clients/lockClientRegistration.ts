import type { ClientRegistration } from "../../../../application/composition/registries/clientRegistration"

export const lockClientRegistration:
  ClientRegistration = {
  id: "locks.client",
  domain: "locks",
  verified: true,
  enabled: true,
}

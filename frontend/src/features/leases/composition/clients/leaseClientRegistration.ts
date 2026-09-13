import type { ClientRegistration } from "../../../../application/composition/registries/clientRegistration"

export const leaseClientRegistration:
  ClientRegistration = {
  id: "leases.client",
  domain: "leases",
  verified: true,
  enabled: true,
}

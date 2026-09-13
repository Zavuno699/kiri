import type { ClientRegistration } from "../../../../application/composition/registries/clientRegistration"

export const paymentClientRegistration:
  ClientRegistration = {
  id: "payments.client",
  domain: "payments",
  verified: true,
  enabled: true,
}

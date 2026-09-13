import type { ClientRegistration } from "../../../../application/composition/registries/clientRegistration"

export const dashboardClientRegistration:
  ClientRegistration = {
  id: "dashboard.client",
  domain: "dashboard",
  verified: true,
  enabled: true,
}

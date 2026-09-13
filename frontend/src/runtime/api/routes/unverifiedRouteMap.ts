import type { BackendRouteVerification } from "../../../application/contracts/backend"

export const unverifiedRouteMap:
  BackendRouteVerification[] = [
  {
    domain: "lock",
    method: "*",
    path: "/api/v1/locks/*",
    verified: false,
    reason:
      "Public lock HTTP ingress has not been verified.",
  },
  {
    domain: "security",
    method: "*",
    path: "/api/v1/security/*",
    verified: false,
    reason:
      "Public security HTTP ingress has not been verified.",
  },
]

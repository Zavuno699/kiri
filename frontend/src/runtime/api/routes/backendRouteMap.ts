import type { BackendRouteVerification } from "../../../application/contracts/backend"

export const backendRouteMap:
  BackendRouteVerification[] = [
  {
    domain: "dashboard",
    method: "GET",
    path: "/api/v1/dashboard/overview",
    verified: true,
  },
  {
    domain: "property",
    method: "GET",
    path: "/api/v1/properties",
    verified: true,
  },
  {
    domain: "lease",
    method: "GET",
    path: "/api/v1/leases",
    verified: true,
  },
  {
    domain: "payment",
    method: "GET",
    path: "/api/v1/payments",
    verified: true,
  },
  {
    domain: "device",
    method: "POST",
    path: "/api/v1/register",
    verified: true,
  },
  {
    domain: "device",
    method: "POST",
    path: "/api/v1/status",
    verified: true,
  },
  {
    domain: "device",
    method: "POST",
    path: "/api/v1/command",
    verified: true,
  },
  {
    domain: "device",
    method: "GET",
    path: "/api/v1/devices/:id",
    verified: true,
  },
]

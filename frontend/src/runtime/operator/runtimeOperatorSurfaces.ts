import type { RuntimeOperatorSurface } from "./runtimeOperatorSurface"

export const runtimeOperatorSurfaces:
  RuntimeOperatorSurface[] = [
  {
    id: "operations",
    title: "Operations",
    domain: "dashboard",
    enabled: true,
    order: 1,
  },
  {
    id: "properties",
    title: "Properties",
    domain: "property",
    enabled: true,
    order: 2,
  },
  {
    id: "leases",
    title: "Leases",
    domain: "lease",
    enabled: true,
    order: 3,
  },
  {
    id: "payments",
    title: "Payments",
    domain: "payment",
    enabled: true,
    order: 4,
  },
  {
    id: "devices",
    title: "Devices",
    domain: "device",
    enabled: true,
    order: 5,
  },
  {
    id: "locks",
    title: "Locks",
    domain: "lock",
    enabled: false,
    order: 6,
  },
  {
    id: "security",
    title: "Security",
    domain: "security",
    enabled: false,
    order: 7,
  },
]

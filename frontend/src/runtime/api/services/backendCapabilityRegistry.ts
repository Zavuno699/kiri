import type { BackendCapability } from "../../../application/contracts/backend"

export const backendCapabilities:
  BackendCapability[] = [
  {
    id: "dashboard.read",
    domain: "dashboard",
    readable: true,
    writable: false,
    commandable: false,
    verified: true,
  },
  {
    id: "property.read",
    domain: "property",
    readable: true,
    writable: false,
    commandable: false,
    verified: true,
  },
  {
    id: "lease.read",
    domain: "lease",
    readable: true,
    writable: false,
    commandable: false,
    verified: true,
  },
  {
    id: "payment.read",
    domain: "payment",
    readable: true,
    writable: false,
    commandable: false,
    verified: true,
  },
  {
    id: "device.register",
    domain: "device",
    readable: true,
    writable: true,
    commandable: true,
    verified: true,
  },
  {
    id: "lock.public",
    domain: "lock",
    readable: false,
    writable: false,
    commandable: false,
    verified: false,
    reason:
      "Public lock ingress not verified.",
  },
  {
    id: "security.public",
    domain: "security",
    readable: false,
    writable: false,
    commandable: false,
    verified: false,
    reason:
      "Public security ingress not verified.",
  },
]

import type {
  RuntimeResourceDefinition,
} from "./resourceDefinition"

export const runtimeResourceDefinitions:
  RuntimeResourceDefinition[] = [
  {
    id: "dashboard.overview",
    domain: "dashboard",
    collectionPath:
      "/api/v1/dashboard/overview",
    detailSupported: false,
    commandSupported: false,
    verified: true,
  },
  {
    id: "property.collection",
    domain: "property",
    collectionPath:
      "/api/v1/properties",
    detailSupported: true,
    commandSupported: false,
    verified: true,
  },
  {
    id: "lease.collection",
    domain: "lease",
    collectionPath:
      "/api/v1/leases",
    detailSupported: true,
    commandSupported: false,
    verified: true,
  },
  {
    id: "payment.collection",
    domain: "payment",
    collectionPath:
      "/api/v1/payments",
    detailSupported: true,
    commandSupported: false,
    verified: true,
  },
  {
    id: "device.command",
    domain: "device",
    collectionPath:
      "/api/v1/status",
    detailSupported: true,
    commandSupported: true,
    verified: true,
  },
  {
    id: "lock.collection",
    domain: "lock",
    collectionPath:
      "/api/v1/locks",
    detailSupported: false,
    commandSupported: false,
    verified: false,
  },
  {
    id: "security.collection",
    domain: "security",
    collectionPath:
      "/api/v1/security",
    detailSupported: false,
    commandSupported: false,
    verified: false,
  },
]

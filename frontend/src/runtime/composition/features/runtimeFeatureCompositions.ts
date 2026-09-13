import type {
  RuntimeFeatureComposition,
} from "./runtimeFeatureComposition"

export const runtimeFeatureCompositions:
  RuntimeFeatureComposition[] = [
  {
    id: "dashboard",
    domain: "dashboard",
    pageDataReady: true,
    serviceReady: true,
    clientVerified: true,
    enabled: true,
  },
  {
    id: "property",
    domain: "property",
    pageDataReady: true,
    serviceReady: true,
    clientVerified: true,
    enabled: true,
  },
  {
    id: "lease",
    domain: "lease",
    pageDataReady: true,
    serviceReady: true,
    clientVerified: true,
    enabled: true,
  },
  {
    id: "payment",
    domain: "payment",
    pageDataReady: true,
    serviceReady: true,
    clientVerified: true,
    enabled: true,
  },
  {
    id: "device",
    domain: "device",
    pageDataReady: true,
    serviceReady: true,
    clientVerified: true,
    enabled: true,
  },
  {
    id: "lock",
    domain: "lock",
    pageDataReady: true,
    serviceReady: true,
    clientVerified: false,
    enabled: false,
  },
  {
    id: "security",
    domain: "security",
    pageDataReady: true,
    serviceReady: true,
    clientVerified: false,
    enabled: false,
  },
]

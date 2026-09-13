export interface RuntimePanelDefinition {
  id: string
  domain: string
  title: string
  enabled: boolean
}

export const runtimePanelDefinitions:
  RuntimePanelDefinition[] = [
  {
    id: "dashboard.overview",
    domain: "dashboard",
    title: "Operations Overview",
    enabled: true,
  },
  {
    id: "property.occupancy",
    domain: "property",
    title: "Property Occupancy",
    enabled: true,
  },
  {
    id: "lease.lifecycle",
    domain: "lease",
    title: "Lease Lifecycle",
    enabled: true,
  },
  {
    id: "payment.settlement",
    domain: "payment",
    title: "Payment Settlement",
    enabled: true,
  },
  {
    id: "device.connectivity",
    domain: "device",
    title: "Device Connectivity",
    enabled: true,
  },
  {
    id: "lock.safety",
    domain: "lock",
    title: "Lock Safety",
    enabled: false,
  },
  {
    id: "security.safety",
    domain: "security",
    title: "Security Safety",
    enabled: false,
  },
]

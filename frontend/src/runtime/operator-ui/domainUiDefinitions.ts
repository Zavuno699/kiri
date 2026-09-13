import type { DomainUiDefinition } from "./domainUiDefinition"

export const domainUiDefinitions:
  DomainUiDefinition[] = [
  {
    domain: "dashboard",
    label: "Operations",
    route: "/",
    enabled: true,
    readOnly: true,
  },
  {
    domain: "property",
    label: "Properties",
    route: "/properties",
    enabled: true,
    readOnly: true,
  },
  {
    domain: "lease",
    label: "Leases",
    route: "/leases",
    enabled: true,
    readOnly: true,
  },
  {
    domain: "payment",
    label: "Payments",
    route: "/payments",
    enabled: true,
    readOnly: true,
  },
  {
    domain: "device",
    label: "Devices",
    route: "/devices",
    enabled: true,
    readOnly: true,
  },
  {
    domain: "lock",
    label: "Locks",
    route: "/locks",
    enabled: false,
    readOnly: true,
  },
  {
    domain: "security",
    label: "Security",
    route: "/security",
    enabled: false,
    readOnly: true,
  },
]

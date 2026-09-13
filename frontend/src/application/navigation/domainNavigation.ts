export interface DomainNavigationItem {
  id: string
  label: string
  path: string
  verified: boolean
  operational: boolean
}

export const domainNavigation: DomainNavigationItem[] = [
  {
    id: "dashboard",
    label: "Operations",
    path: "/",
    verified: true,
    operational: true,
  },
  {
    id: "properties",
    label: "Properties",
    path: "/properties",
    verified: false,
    operational: true,
  },
  {
    id: "leases",
    label: "Leases",
    path: "/leases",
    verified: true,
    operational: true,
  },
  {
    id: "payments",
    label: "Payments",
    path: "/payments",
    verified: false,
    operational: true,
  },
  {
    id: "devices",
    label: "Devices",
    path: "/devices",
    verified: true,
    operational: true,
  },
  {
    id: "locks",
    label: "Locks",
    path: "/locks",
    verified: false,
    operational: false,
  },
  {
    id: "security",
    label: "Security",
    path: "/security",
    verified: false,
    operational: false,
  },
]

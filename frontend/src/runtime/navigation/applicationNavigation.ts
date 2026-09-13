export interface ApplicationNavigation {
  id: string
  label: string
  path: string
  enabled: boolean
  order: number
}

export const applicationNavigation: ApplicationNavigation[] = [
  {
    id: "dashboard",
    label: "Operations",
    path: "/",
    enabled: true,
    order: 1,
  },
  {
    id: "properties",
    label: "Properties",
    path: "/properties",
    enabled: true,
    order: 2,
  },
  {
    id: "leases",
    label: "Leases",
    path: "/leases",
    enabled: true,
    order: 3,
  },
  {
    id: "payments",
    label: "Payments",
    path: "/payments",
    enabled: true,
    order: 4,
  },
  {
    id: "devices",
    label: "Devices",
    path: "/devices",
    enabled: true,
    order: 5,
  },
  {
    id: "locks",
    label: "Locks",
    path: "/locks",
    enabled: false,
    order: 6,
  },
  {
    id: "security",
    label: "Security",
    path: "/security",
    enabled: false,
    order: 7,
  },
]

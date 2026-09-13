export interface OperatorSurfaceSection {
  id: string
  title: string
  domain: string
  visible: boolean
  priority: number
}

export const operatorSurfaceSections:
  OperatorSurfaceSection[] = [
    {
      id: "dashboard",
      title: "Operations",
      domain: "dashboard",
      visible: true,
      priority: 1,
    },
    {
      id: "properties",
      title: "Properties",
      domain: "property",
      visible: true,
      priority: 2,
    },
    {
      id: "leases",
      title: "Leases",
      domain: "lease",
      visible: true,
      priority: 3,
    },
    {
      id: "payments",
      title: "Payments",
      domain: "payment",
      visible: true,
      priority: 4,
    },
    {
      id: "devices",
      title: "Devices",
      domain: "device",
      visible: true,
      priority: 5,
    },
    {
      id: "locks",
      title: "Locks",
      domain: "lock",
      visible: false,
      priority: 6,
    },
    {
      id: "security",
      title: "Security",
      domain: "security",
      visible: false,
      priority: 7,
    },
  ]

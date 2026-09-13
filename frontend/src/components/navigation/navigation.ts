export interface NavigationItem {
  label: string
  path: string
  section: string
  description: string
}

export const navigationItems: NavigationItem[] = [
  {
    label: "Dashboard",
    path: "/",
    section: "Overview",
    description: "Operational overview",
  },
  {
    label: "Properties",
    path: "/properties",
    section: "Property operations",
    description: "Property inventory and occupancy",
  },
  {
    label: "Leases",
    path: "/leases",
    section: "Property operations",
    description: "Lease state and entitlements",
  },
  {
    label: "Payments",
    path: "/payments",
    section: "Financial operations",
    description: "Payment settlement and reconciliation",
  },
  {
    label: "Devices",
    path: "/devices",
    section: "Cyber-physical operations",
    description: "Device connectivity and health",
  },
  {
    label: "Locks",
    path: "/locks",
    section: "Cyber-physical operations",
    description: "Physical access control",
  },
  {
    label: "Security",
    path: "/security",
    section: "Security operations",
    description: "Credentials and access posture",
  },
]

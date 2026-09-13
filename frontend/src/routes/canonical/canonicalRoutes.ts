export interface CanonicalRoute {
  id: string;
  path: string;
  label: string;
  kind:
    | "workspace"
    | "control"
    | "security"
    | "health";
  requiresAuthentication: boolean;
  capability?: string;
}

export const canonicalRoutes: CanonicalRoute[] = [
  {
    id: "dashboard",
    path: "/",
    label: "Overview",
    kind: "workspace",
    requiresAuthentication: false,
    capability: "dashboard.read",
  },
  {
    id: "properties",
    path: "/properties",
    label: "Properties",
    kind: "workspace",
    requiresAuthentication: true,
    capability: "properties.read",
  },
  {
    id: "leases",
    path: "/leases",
    label: "Leases",
    kind: "workspace",
    requiresAuthentication: true,
    capability: "leases.read",
  },
  {
    id: "payments",
    path: "/payments",
    label: "Payments",
    kind: "workspace",
    requiresAuthentication: true,
    capability: "payments.read",
  },
  {
    id: "devices",
    path: "/devices",
    label: "Devices",
    kind: "workspace",
    requiresAuthentication: true,
    capability: "devices.read",
  },
  {
    id: "locks",
    path: "/locks",
    label: "Locks",
    kind: "workspace",
    requiresAuthentication: true,
    capability: "locks.read",
  },
  {
    id: "security",
    path: "/security",
    label: "Security",
    kind: "security",
    requiresAuthentication: true,
    capability: "security.read",
  },
  {
    id: "security-audit",
    path: "/security/audit",
    label: "Security Audit",
    kind: "security",
    requiresAuthentication: true,
    capability: "security.review",
  },
  {
    id: "security-control",
    path: "/security/control",
    label: "Security Control",
    kind: "security",
    requiresAuthentication: true,
    capability: "security.admin",
  },
  {
    id: "rbac",
    path: "/rbac",
    label: "Access Control",
    kind: "control",
    requiresAuthentication: true,
    capability: "security.admin",
  },
  {
    id: "operator-control",
    path: "/operator-control",
    label: "Operator Control",
    kind: "control",
    requiresAuthentication: true,
    capability: "dashboard.read",
  },
  {
    id: "health",
    path: "/health",
    label: "Frontend Health",
    kind: "health",
    requiresAuthentication: true,
    capability: "dashboard.read",
  },
  {
    id: "integrity",
    path: "/integrity",
    label: "Operational Integrity",
    kind: "health",
    requiresAuthentication: true,
    capability: "dashboard.read",
  },
  {
    id: "runtime",
    path: "/runtime",
    label: "Unified Runtime",
    kind: "health",
    requiresAuthentication: true,
    capability: "dashboard.read",
  },
];

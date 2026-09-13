import {
  registerRouteMetadata,
} from "../registry/routeMetadataRegistry";

const routes = [
  {
    route: "/",
    key: "dashboard",
    domain: "dashboard",
    title: "Operations Dashboard",
    capability: "dashboard.read",
    breadcrumb: ["Operations"],
  },
  {
    route: "/properties",
    key: "properties",
    domain: "properties",
    title: "Properties",
    capability: "properties.read",
    breadcrumb: ["Operations", "Properties"],
  },
  {
    route: "/leases",
    key: "leases",
    domain: "leases",
    title: "Leases",
    capability: "leases.read",
    breadcrumb: ["Operations", "Leases"],
  },
  {
    route: "/payments",
    key: "payments",
    domain: "payments",
    title: "Payments",
    capability: "payments.read",
    breadcrumb: ["Operations", "Payments"],
  },
  {
    route: "/devices",
    key: "devices",
    domain: "devices",
    title: "Devices",
    capability: "devices.read",
    breadcrumb: ["Operations", "Devices"],
  },
  {
    route: "/locks",
    key: "locks",
    domain: "locks",
    title: "Locks",
    capability: "locks.read",
    breadcrumb: ["Operations", "Locks"],
  },
  {
    route: "/security",
    key: "security",
    domain: "security",
    title: "Security",
    capability: "security.read",
    breadcrumb: ["Operations", "Security"],
  },
  {
    route: "/security/audit",
    key: "security-audit",
    domain: "security",
    title: "Security Audit",
    capability: "security.audit.read",
    breadcrumb: ["Operations", "Security", "Audit"],
  },
  {
    route: "/security/control",
    key: "security-control",
    domain: "security",
    title: "Security Control",
    capability: "security.control",
    breadcrumb: ["Operations", "Security", "Control"],
  },
  {
    route: "/rbac",
    key: "rbac",
    domain: "security",
    title: "RBAC",
    capability: "security.read",
    breadcrumb: ["Operations", "Security", "RBAC"],
  },
  {
    route: "/operator-control",
    key: "operator-control",
    domain: "security",
    title: "Operator Control",
    capability: "operator.control",
    breadcrumb: ["Operations", "Operator Control"],
  },
  {
    route: "/operator-control/global",
    key: "operator-global",
    domain: "security",
    title: "Global Operator Control",
    capability: "operator.global.control",
    breadcrumb: ["Operations", "Operator Control", "Global"],
  },
  {
    route: "/health",
    key: "health",
    domain: "dashboard",
    title: "Frontend Health",
    capability: "dashboard.read",
    breadcrumb: ["Operations", "Health"],
  },
  {
    route: "/integrity",
    key: "integrity",
    domain: "security",
    title: "Operational Integrity",
    capability: "security.read",
    breadcrumb: ["Operations", "Integrity"],
  },
  {
    route: "/runtime",
    key: "runtime",
    domain: "security",
    title: "Unified Runtime",
    capability: "runtime.read",
    breadcrumb: ["Operations", "Runtime"],
  },
] as const;

export function registerCanonicalRouteMetadata(): void {
  for (const route of routes) {
    registerRouteMetadata({
      ...route,
      protected: true,
      operational: true,
      breadcrumb: [
        ...route.breadcrumb,
      ],
    });
  }
}

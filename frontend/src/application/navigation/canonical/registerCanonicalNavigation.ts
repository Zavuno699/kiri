import {
  setNavigationItems,
} from "../state/navigationStore";

const items = [
  {
    key: "dashboard",
    label: "Dashboard",
    route: "/",
    domain: "dashboard",
    capability: "dashboard.read",
    order: 1,
  },
  {
    key: "properties",
    label: "Properties",
    route: "/properties",
    domain: "properties",
    capability: "properties.read",
    order: 2,
  },
  {
    key: "leases",
    label: "Leases",
    route: "/leases",
    domain: "leases",
    capability: "leases.read",
    order: 3,
  },
  {
    key: "payments",
    label: "Payments",
    route: "/payments",
    domain: "payments",
    capability: "payments.read",
    order: 4,
  },
  {
    key: "devices",
    label: "Devices",
    route: "/devices",
    domain: "devices",
    capability: "devices.read",
    order: 5,
  },
  {
    key: "locks",
    label: "Locks",
    route: "/locks",
    domain: "locks",
    capability: "locks.read",
    order: 6,
  },
  {
    key: "security",
    label: "Security",
    route: "/security",
    domain: "security",
    capability: "security.read",
    order: 7,
  },
  {
    key: "health",
    label: "Health",
    route: "/health",
    domain: "dashboard",
    capability: "dashboard.read",
    order: 8,
  },
  {
    key: "integrity",
    label: "Integrity",
    route: "/integrity",
    domain: "security",
    capability: "security.read",
    order: 9,
  },
  {
    key: "runtime",
    label: "Runtime",
    route: "/runtime",
    domain: "security",
    capability: "runtime.read",
    order: 10,
  },
] as const;

export function registerCanonicalNavigation(): void {
  setNavigationItems(
    items.map(
      (item) => ({
        ...item,
        visible: true,
      }),
    ),
  );
}

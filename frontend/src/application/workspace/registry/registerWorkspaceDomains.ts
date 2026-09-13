import {
  registerWorkspaceDomain,
} from "./workspaceDomainRegistry";

const domains = [
  {
    key: "dashboard",
    label: "Dashboard",
    route: "/",
  },
  {
    key: "properties",
    label: "Properties",
    route: "/properties",
  },
  {
    key: "leases",
    label: "Leases",
    route: "/leases",
  },
  {
    key: "payments",
    label: "Payments",
    route: "/payments",
  },
  {
    key: "devices",
    label: "Devices",
    route: "/devices",
  },
  {
    key: "locks",
    label: "Locks",
    route: "/locks",
  },
  {
    key: "security",
    label: "Security",
    route: "/security",
  },
];

export function registerCanonicalWorkspaceDomains(): void {
  for (const domain of domains) {
    registerWorkspaceDomain(
      domain,
    );
  }
}

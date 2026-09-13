import {
  registerFeatureRuntime,
} from "./featureRuntimeRegistry";

const domains = [
  {
    domain: "dashboard",
    capabilities: [
      "dashboard.read",
    ],
  },
  {
    domain: "properties",
    capabilities: [
      "properties.read",
      "properties.write",
    ],
  },
  {
    domain: "leases",
    capabilities: [
      "leases.read",
      "leases.write",
    ],
  },
  {
    domain: "payments",
    capabilities: [
      "payments.read",
      "payments.write",
    ],
  },
  {
    domain: "devices",
    capabilities: [
      "devices.read",
      "devices.command",
    ],
  },
  {
    domain: "locks",
    capabilities: [
      "locks.read",
      "locks.command",
    ],
  },
  {
    domain: "security",
    capabilities: [
      "security.read",
      "security.review",
      "security.admin",
    ],
  },
];

export function registerFeatureRuntimes(): void {
  for (const domain of domains) {
    registerFeatureRuntime({
      domain: domain.domain,
      required: true,
      initialized: false,
      capabilities: domain.capabilities,
    });
  }
}

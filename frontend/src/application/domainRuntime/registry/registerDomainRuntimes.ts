import {
  registerDomainRuntimeDescriptor,
} from "./domainRuntimeRegistry";

const descriptors = [
  {
    domain: "dashboard",
    dependencies: [
      "properties",
      "leases",
      "payments",
      "devices",
      "locks",
      "security",
    ],
    capabilities: [
      "dashboard.read",
    ],
  },
  {
    domain: "properties",
    dependencies: [],
    capabilities: [
      "properties.read",
      "properties.write",
    ],
  },
  {
    domain: "leases",
    dependencies: [
      "properties",
      "payments",
      "devices",
      "locks",
    ],
    capabilities: [
      "leases.read",
      "leases.write",
    ],
  },
  {
    domain: "payments",
    dependencies: [
      "leases",
    ],
    capabilities: [
      "payments.read",
      "payments.write",
    ],
  },
  {
    domain: "devices",
    dependencies: [
      "properties",
      "leases",
    ],
    capabilities: [
      "devices.read",
      "devices.write",
      "devices.command",
    ],
  },
  {
    domain: "locks",
    dependencies: [
      "devices",
      "leases",
    ],
    capabilities: [
      "locks.read",
      "locks.write",
      "locks.command",
    ],
  },
  {
    domain: "security",
    dependencies: [
      "dashboard",
      "devices",
      "locks",
    ],
    capabilities: [
      "security.read",
      "security.audit.read",
      "security.control",
      "recovery.execute",
    ],
  },
] as const;

export function registerCanonicalDomainRuntimes(): void {
  for (const descriptor of descriptors) {
    registerDomainRuntimeDescriptor({
      domain:
        descriptor.domain,
      enabled: true,
      initialized: false,
      ready: false,
      dependencies: [
        ...descriptor.dependencies,
      ],
      capabilities: [
        ...descriptor.capabilities,
      ],
    });
  }
}

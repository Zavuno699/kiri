import {
  registerDomainFlowDefinition,
} from "./domainFlowRegistry";

const definitions = [
  {
    key:
      "dashboard.read",
    domain:
      "dashboard",
    readCapability:
      "dashboard.read",
    steps: [
      "authorization",
      "query",
      "api",
      "projection",
      "persistence",
    ],
  },

  {
    key:
      "properties.lifecycle",
    domain:
      "properties",
    readCapability:
      "properties.read",
    writeCapability:
      "properties.write",
    steps: [
      "authorization",
      "command",
      "api",
      "event",
      "projection",
      "persistence",
    ],
  },

  {
    key:
      "leases.lifecycle",
    domain:
      "leases",
    readCapability:
      "leases.read",
    writeCapability:
      "leases.write",
    steps: [
      "authorization",
      "command",
      "api",
      "event",
      "projection",
      "persistence",
    ],
  },

  {
    key:
      "payments.lifecycle",
    domain:
      "payments",
    readCapability:
      "payments.read",
    writeCapability:
      "payments.write",
    steps: [
      "authorization",
      "command",
      "api",
      "event",
      "projection",
      "persistence",
    ],
  },

  {
    key:
      "devices.lifecycle",
    domain:
      "devices",
    readCapability:
      "devices.read",
    writeCapability:
      "devices.write",
    commandCapability:
      "devices.command",
    steps: [
      "authorization",
      "command",
      "api",
      "event",
      "projection",
      "persistence",
    ],
  },

  {
    key:
      "locks.lifecycle",
    domain:
      "locks",
    readCapability:
      "locks.read",
    writeCapability:
      "locks.write",
    commandCapability:
      "locks.command",
    steps: [
      "authorization",
      "command",
      "api",
      "event",
      "projection",
      "persistence",
    ],
  },

  {
    key:
      "security.lifecycle",
    domain:
      "security",
    readCapability:
      "security.read",
    writeCapability:
      "security.control",
    commandCapability:
      "recovery.execute",
    steps: [
      "authorization",
      "command",
      "api",
      "event",
      "projection",
      "persistence",
    ],
  },
];

export function registerCanonicalDomainFlows(): void {
  for (
    const definition of definitions
  ) {
    registerDomainFlowDefinition(
      definition,
    );
  }
}

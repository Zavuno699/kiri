import {
  registerOperationalEntity,
} from "../registry/operationalEntityRegistry";

const entities = [
  {
    id:
      "property",
    domain:
      "properties",
    type:
      "property",
    title:
      "Property",
    subtitle:
      "Canonical property entity",
    status:
      "active",
    health:
      "healthy" as const,
  },
  {
    id:
      "lease",
    domain:
      "leases",
    type:
      "lease",
    title:
      "Lease",
    subtitle:
      "Canonical lease entity",
    status:
      "active",
    health:
      "healthy" as const,
  },
  {
    id:
      "payment",
    domain:
      "payments",
    type:
      "payment",
    title:
      "Payment",
    subtitle:
      "Canonical payment entity",
    status:
      "pending",
    health:
      "unknown" as const,
  },
  {
    id:
      "device",
    domain:
      "devices",
    type:
      "device",
    title:
      "Device",
    subtitle:
      "Canonical device entity",
    status:
      "online",
    health:
      "healthy" as const,
  },
  {
    id:
      "lock",
    domain:
      "locks",
    type:
      "lock",
    title:
      "Lock",
    subtitle:
      "Canonical lock entity",
    status:
      "secured",
    health:
      "healthy" as const,
  },
  {
    id:
      "security",
    domain:
      "security",
    type:
      "security-state",
    title:
      "Security",
    subtitle:
      "Canonical security state",
    status:
      "protected",
    health:
      "healthy" as const,
  },
];

export function registerOperationalEntityBuilders(): void {
  for (
    const entity of
      entities
  ) {
    registerOperationalEntity({
      ...entity,
      metadata:
        {},
    });
  }
}

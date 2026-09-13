import {
  registerQuery,
} from "./queryRegistry";

const queries = [
  {
    id:
      "property.context",
    domain:
      "properties",
    name:
      "property-context",
    label:
      "Property context",
    description:
      "Resolve property operational context.",
    readOnly:
      true,
    enabled:
      true,
  },

  {
    id:
      "lease.context",
    domain:
      "leases",
    name:
      "lease-context",
    label:
      "Lease context",
    description:
      "Resolve lease operational context.",
    readOnly:
      true,
    enabled:
      true,
  },

  {
    id:
      "payment.context",
    domain:
      "payments",
    name:
      "payment-context",
    label:
      "Payment context",
    description:
      "Resolve payment context.",
    readOnly:
      true,
    enabled:
      true,
  },

  {
    id:
      "device.context",
    domain:
      "devices",
    name:
      "device-context",
    label:
      "Device context",
    description:
      "Resolve device context.",
    readOnly:
      true,
    enabled:
      true,
  },

  {
    id:
      "lock.context",
    domain:
      "locks",
    name:
      "lock-context",
    label:
      "Lock context",
    description:
      "Resolve lock context.",
    readOnly:
      true,
    enabled:
      true,
  },

  {
    id:
      "security.context",
    domain:
      "security",
    name:
      "security-context",
    label:
      "Security context",
    description:
      "Resolve security context.",
    readOnly:
      true,
    enabled:
      true,
  },

  {
    id:
      "entity.relationships",
    domain:
      "global",
    name:
      "entity-relationships",
    label:
      "Entity relationships",
    description:
      "Resolve cross-domain relationships.",
    readOnly:
      true,
    enabled:
      true,
  },

  {
    id:
      "entity.dependencies",
    domain:
      "global",
    name:
      "entity-dependencies",
    label:
      "Entity dependencies",
    description:
      "Resolve operational dependencies.",
    readOnly:
      true,
    enabled:
      true,
  },
];

export function registerCanonicalQueries(): void {
  for (
    const query of
      queries
  ) {
    registerQuery(
      query,
    );
  }
}

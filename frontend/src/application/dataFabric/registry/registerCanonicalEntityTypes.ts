import {
  registerEntityType,
} from "./entityRegistry";

const entities = [
  {
    id:
      "property",
    domain:
      "properties",
    type:
      "property",
    label:
      "Property",
  },
  {
    id:
      "lease",
    domain:
      "leases",
    type:
      "lease",
    label:
      "Lease",
  },
  {
    id:
      "payment",
    domain:
      "payments",
    type:
      "payment",
    label:
      "Payment",
  },
  {
    id:
      "device",
    domain:
      "devices",
    type:
      "device",
    label:
      "Device",
  },
  {
    id:
      "lock",
    domain:
      "locks",
    type:
      "lock",
    label:
      "Lock",
  },
  {
    id:
      "security",
    domain:
      "security",
    type:
      "security-state",
    label:
      "Security State",
  },
] as const;

export function registerCanonicalEntityTypes(): void {
  for (const entity of entities) {
    registerEntityType(
      entity,
    );
  }
}

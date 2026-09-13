import {
  registerReadModel,
} from "../registry/readModelRegistry";

const models = [
  {
    id:
      "readModel.property",
    domain:
      "properties",
    name:
      "property-operational",
    label:
      "Property operational view",
    description:
      "Materialized property operational read model.",
    projectionIds:
      [
        "projection.property",
      ],
    entityType:
      "property",
    version:
      1,
    enabled:
      true,
  },

  {
    id:
      "readModel.lease",
    domain:
      "leases",
    name:
      "lease-operational",
    label:
      "Lease operational view",
    description:
      "Materialized lease operational read model.",
    projectionIds:
      [
        "projection.lease",
      ],
    entityType:
      "lease",
    version:
      1,
    enabled:
      true,
  },

  {
    id:
      "readModel.payment",
    domain:
      "payments",
    name:
      "payment-operational",
    label:
      "Payment operational view",
    description:
      "Materialized payment operational read model.",
    projectionIds:
      [
        "projection.payment",
      ],
    entityType:
      "payment",
    version:
      1,
    enabled:
      true,
  },

  {
    id:
      "readModel.device",
    domain:
      "devices",
    name:
      "device-operational",
    label:
      "Device operational view",
    description:
      "Materialized device operational read model.",
    projectionIds:
      [
        "projection.device",
      ],
    entityType:
      "device",
    version:
      1,
    enabled:
      true,
  },

  {
    id:
      "readModel.lock",
    domain:
      "locks",
    name:
      "lock-operational",
    label:
      "Lock operational view",
    description:
      "Materialized lock operational read model.",
    projectionIds:
      [
        "projection.lock",
      ],
    entityType:
      "lock",
    version:
      1,
    enabled:
      true,
  },

  {
    id:
      "readModel.security",
    domain:
      "security",
    name:
      "security-operational",
    label:
      "Security operational view",
    description:
      "Materialized security operational read model.",
    projectionIds:
      [
        "projection.security",
      ],
    entityType:
      "security",
    version:
      1,
    enabled:
      true,
  },

  {
    id:
      "readModel.dashboard",
    domain:
      "dashboard",
    name:
      "dashboard-operational",
    label:
      "Dashboard operational view",
    description:
      "Cross-domain dashboard read model.",
    projectionIds:
      [
        "projection.dashboard",
      ],
    entityType:
      "dashboard",
    version:
      1,
    enabled:
      true,
  },
];

export function registerCanonicalReadModels(): void {
  for (
    const model of
      models
  ) {
    registerReadModel(
      model,
    );
  }
}

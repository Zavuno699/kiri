import {
  registerProjection,
} from "../registry/projectionRegistry";

const projections = [
  {
    id:
      "projection.property",
    domain:
      "properties",
    name:
      "property-projection",
    label:
      "Property projection",
    description:
      "Materializes property operational state.",
    sourceEventTypes:
      [
        "property.updated",
      ],
    materialized:
      true,
    rebuildable:
      true,
    enabled:
      true,
  },

  {
    id:
      "projection.lease",
    domain:
      "leases",
    name:
      "lease-projection",
    label:
      "Lease projection",
    description:
      "Materializes lease lifecycle state.",
    sourceEventTypes:
      [
        "lease.updated",
      ],
    materialized:
      true,
    rebuildable:
      true,
    enabled:
      true,
  },

  {
    id:
      "projection.payment",
    domain:
      "payments",
    name:
      "payment-projection",
    label:
      "Payment projection",
    description:
      "Materializes payment state.",
    sourceEventTypes:
      [
        "payment.recorded",
      ],
    materialized:
      true,
    rebuildable:
      true,
    enabled:
      true,
  },

  {
    id:
      "projection.device",
    domain:
      "devices",
    name:
      "device-projection",
    label:
      "Device projection",
    description:
      "Materializes device lifecycle and telemetry state.",
    sourceEventTypes:
      [
        "device.updated",
        "device.reconciled",
      ],
    materialized:
      true,
    rebuildable:
      true,
    enabled:
      true,
  },

  {
    id:
      "projection.lock",
    domain:
      "locks",
    name:
      "lock-projection",
    label:
      "Lock projection",
    description:
      "Materializes lock lifecycle state.",
    sourceEventTypes:
      [
        "lock.secured",
        "lock.released",
      ],
    materialized:
      true,
    rebuildable:
      true,
    enabled:
      true,
  },

  {
    id:
      "projection.security",
    domain:
      "security",
    name:
      "security-projection",
    label:
      "Security projection",
    description:
      "Materializes security lifecycle state.",
    sourceEventTypes:
      [
        "security.frozen",
        "security.recovered",
      ],
    materialized:
      true,
    rebuildable:
      true,
    enabled:
      true,
  },

  {
    id:
      "projection.dashboard",
    domain:
      "dashboard",
    name:
      "dashboard-projection",
    label:
      "Dashboard projection",
    description:
      "Materializes cross-domain dashboard state.",
    sourceEventTypes:
      [
        "property.updated",
        "lease.updated",
        "payment.recorded",
        "device.updated",
        "lock.secured",
        "security.frozen",
      ],
    materialized:
      true,
    rebuildable:
      true,
    enabled:
      true,
  },
];

export function registerCanonicalProjections(): void {
  for (
    const projection of
      projections
  ) {
    registerProjection(
      projection,
    );
  }
}

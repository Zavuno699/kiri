import {
  registerProjection,
} from "./projectionRegistry";

const projections = [
  {
    id:
      "property.projection",
    domain:
      "properties",
    name:
      "property-projection",
    label:
      "Property projection",
    description:
      "Projects property operational state.",
    sourceEventTypes:
      ["property.updated"],
    enabled:
      true,
  },

  {
    id:
      "lease.projection",
    domain:
      "leases",
    name:
      "lease-projection",
    label:
      "Lease projection",
    description:
      "Projects lease state.",
    sourceEventTypes:
      ["lease.updated"],
    enabled:
      true,
  },

  {
    id:
      "payment.projection",
    domain:
      "payments",
    name:
      "payment-projection",
    label:
      "Payment projection",
    description:
      "Projects payment state.",
    sourceEventTypes:
      ["payment.recorded"],
    enabled:
      true,
  },

  {
    id:
      "device.projection",
    domain:
      "devices",
    name:
      "device-projection",
    label:
      "Device projection",
    description:
      "Projects device state.",
    sourceEventTypes:
      [
        "device.updated",
        "device.reconciled",
      ],
    enabled:
      true,
  },

  {
    id:
      "lock.projection",
    domain:
      "locks",
    name:
      "lock-projection",
    label:
      "Lock projection",
    description:
      "Projects lock state.",
    sourceEventTypes:
      [
        "lock.secured",
        "lock.released",
      ],
    enabled:
      true,
  },

  {
    id:
      "security.projection",
    domain:
      "security",
    name:
      "security-projection",
    label:
      "Security projection",
    description:
      "Projects security state.",
    sourceEventTypes:
      [
        "security.frozen",
        "security.recovered",
      ],
    enabled:
      true,
  },

  {
    id:
      "command.audit.projection",
    domain:
      "global",
    name:
      "command-audit-projection",
    label:
      "Command audit projection",
    description:
      "Projects command acceptance and block history.",
    sourceEventTypes:
      [
        "command.accepted",
        "command.blocked",
      ],
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

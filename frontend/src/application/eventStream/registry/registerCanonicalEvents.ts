import {
  registerEvent,
} from "./eventRegistry";

const events = [
  {
    id:
      "property.updated",
    domain:
      "properties",
    name:
      "property.updated",
    version:
      1,
    label:
      "Property updated",
    description:
      "Property operational state changed.",
    category:
      "domain" as const,
    enabled:
      true,
  },

  {
    id:
      "lease.updated",
    domain:
      "leases",
    name:
      "lease.updated",
    version:
      1,
    label:
      "Lease updated",
    description:
      "Lease operational state changed.",
    category:
      "domain" as const,
    enabled:
      true,
  },

  {
    id:
      "payment.recorded",
    domain:
      "payments",
    name:
      "payment.recorded",
    version:
      1,
    label:
      "Payment recorded",
    description:
      "A payment state was recorded.",
    category:
      "domain" as const,
    enabled:
      true,
  },

  {
    id:
      "device.updated",
    domain:
      "devices",
    name:
      "device.updated",
    version:
      1,
    label:
      "Device updated",
    description:
      "Device state or telemetry changed.",
    category:
      "domain" as const,
    enabled:
      true,
  },

  {
    id:
      "device.reconciled",
    domain:
      "devices",
    name:
      "device.reconciled",
    version:
      1,
    label:
      "Device reconciled",
    description:
      "Device state reconciliation completed.",
    category:
      "domain" as const,
    enabled:
      true,
  },

  {
    id:
      "lock.secured",
    domain:
      "locks",
    name:
      "lock.secured",
    version:
      1,
    label:
      "Lock secured",
    description:
      "Lock entered secured state.",
    category:
      "domain" as const,
    enabled:
      true,
  },

  {
    id:
      "lock.released",
    domain:
      "locks",
    name:
      "lock.released",
    version:
      1,
    label:
      "Lock released",
    description:
      "Lock entered released state.",
    category:
      "domain" as const,
    enabled:
      true,
  },

  {
    id:
      "security.frozen",
    domain:
      "security",
    name:
      "security.frozen",
    version:
      1,
    label:
      "Security frozen",
    description:
      "Emergency security freeze became active.",
    category:
      "security" as const,
    enabled:
      true,
  },

  {
    id:
      "security.recovered",
    domain:
      "security",
    name:
      "security.recovered",
    version:
      1,
    label:
      "Security recovered",
    description:
      "Security control returned from frozen state.",
    category:
      "security" as const,
    enabled:
      true,
  },

  {
    id:
      "command.accepted",
    domain:
      "global",
    name:
      "command.accepted",
    version:
      1,
    label:
      "Command accepted",
    description:
      "A command was accepted by the control plane.",
    category:
      "command" as const,
    enabled:
      true,
  },

  {
    id:
      "command.blocked",
    domain:
      "global",
    name:
      "command.blocked",
    version:
      1,
    label:
      "Command blocked",
    description:
      "A command was blocked by authorization or policy.",
    category:
      "command" as const,
    enabled:
      true,
  },
];

export function registerCanonicalEvents(): void {
  for (
    const event of
      events
  ) {
    registerEvent(
      event,
    );
  }
}

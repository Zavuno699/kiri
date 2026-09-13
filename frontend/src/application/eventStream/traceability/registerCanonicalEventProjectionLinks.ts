import {
  registerEventProjectionLink,
} from "./eventProjectionRegistry";

const links = [
  {
    id:
      "property-updated-property-projection",
    eventType:
      "property.updated",
    projectionId:
      "property.projection",
    relation:
      "updates" as const,
    required:
      true,
  },

  {
    id:
      "lease-updated-lease-projection",
    eventType:
      "lease.updated",
    projectionId:
      "lease.projection",
    relation:
      "updates" as const,
    required:
      true,
  },

  {
    id:
      "payment-recorded-payment-projection",
    eventType:
      "payment.recorded",
    projectionId:
      "payment.projection",
    relation:
      "updates" as const,
    required:
      true,
  },

  {
    id:
      "device-updated-device-projection",
    eventType:
      "device.updated",
    projectionId:
      "device.projection",
    relation:
      "updates" as const,
    required:
      true,
  },

  {
    id:
      "device-reconciled-device-projection",
    eventType:
      "device.reconciled",
    projectionId:
      "device.projection",
    relation:
      "updates" as const,
    required:
      true,
  },

  {
    id:
      "lock-secured-lock-projection",
    eventType:
      "lock.secured",
    projectionId:
      "lock.projection",
    relation:
      "updates" as const,
    required:
      true,
  },

  {
    id:
      "lock-released-lock-projection",
    eventType:
      "lock.released",
    projectionId:
      "lock.projection",
    relation:
      "updates" as const,
    required:
      true,
  },

  {
    id:
      "security-frozen-security-projection",
    eventType:
      "security.frozen",
    projectionId:
      "security.projection",
    relation:
      "updates" as const,
    required:
      true,
  },

  {
    id:
      "security-recovered-security-projection",
    eventType:
      "security.recovered",
    projectionId:
      "security.projection",
    relation:
      "updates" as const,
    required:
      true,
  },

  {
    id:
      "command-accepted-command-audit",
    eventType:
      "command.accepted",
    projectionId:
      "command.audit.projection",
    relation:
      "updates" as const,
    required:
      true,
  },

  {
    id:
      "command-blocked-command-audit",
    eventType:
      "command.blocked",
    projectionId:
      "command.audit.projection",
    relation:
      "updates" as const,
    required:
      true,
  },
];

export function registerCanonicalEventProjectionLinks(): void {
  for (
    const link of
      links
  ) {
    registerEventProjectionLink(
      link,
    );
  }
}

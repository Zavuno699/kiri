import {
  registerCommandEventLink,
} from "./commandEventRegistry";

const links = [
  {
    id:
      "property-refresh-property-updated",
    commandId:
      "property.refresh",
    eventType:
      "property.updated",
    relation:
      "may-emit" as const,
    required:
      false,
  },

  {
    id:
      "lease-refresh-lease-updated",
    commandId:
      "lease.refresh",
    eventType:
      "lease.updated",
    relation:
      "may-emit" as const,
    required:
      false,
  },

  {
    id:
      "payment-refresh-payment-recorded",
    commandId:
      "payment.refresh",
    eventType:
      "payment.recorded",
    relation:
      "may-emit" as const,
    required:
      false,
  },

  {
    id:
      "device-refresh-device-updated",
    commandId:
      "device.refresh",
    eventType:
      "device.updated",
    relation:
      "may-emit" as const,
    required:
      false,
  },

  {
    id:
      "device-reconcile-device-reconciled",
    commandId:
      "device.reconcile",
    eventType:
      "device.reconciled",
    relation:
      "emits" as const,
    required:
      false,
  },

  {
    id:
      "lock-secure-lock-secured",
    commandId:
      "lock.secure",
    eventType:
      "lock.secured",
    relation:
      "emits" as const,
    required:
      true,
  },

  {
    id:
      "lock-release-lock-released",
    commandId:
      "lock.release",
    eventType:
      "lock.released",
    relation:
      "emits" as const,
    required:
      true,
  },

  {
    id:
      "security-freeze-security-frozen",
    commandId:
      "security.freeze",
    eventType:
      "security.frozen",
    relation:
      "emits" as const,
    required:
      true,
  },

  {
    id:
      "security-unfreeze-security-recovered",
    commandId:
      "security.unfreeze",
    eventType:
      "security.recovered",
    relation:
      "emits" as const,
    required:
      true,
  },

  {
    id:
      "command-accepted-audit",
    commandId:
      "*",
    eventType:
      "command.accepted",
    relation:
      "emits" as const,
    required:
      true,
  },

  {
    id:
      "command-blocked-audit",
    commandId:
      "*",
    eventType:
      "command.blocked",
    relation:
      "emits" as const,
    required:
      true,
  },
];

export function registerCanonicalCommandEventLinks(): void {
  for (
    const link of
      links
  ) {
    registerCommandEventLink(
      link,
    );
  }
}

import {
  registerCommand,
} from "./commandRegistry";

const commands = [
  {
    id:
      "property.refresh",
    domain:
      "properties",
    name:
      "refresh-property",
    label:
      "Refresh property",
    description:
      "Refresh the authoritative operational property view.",
    risk:
      "read" as const,
    requiresAuthorization:
      false,
    requiresConfirmation:
      false,
    enabled:
      true,
  },

  {
    id:
      "lease.refresh",
    domain:
      "leases",
    name:
      "refresh-lease",
    label:
      "Refresh lease",
    description:
      "Refresh lease state from the operational fabric.",
    risk:
      "read" as const,
    requiresAuthorization:
      false,
    requiresConfirmation:
      false,
    enabled:
      true,
  },

  {
    id:
      "payment.refresh",
    domain:
      "payments",
    name:
      "refresh-payment",
    label:
      "Refresh payment",
    description:
      "Refresh payment state.",
    risk:
      "read" as const,
    requiresAuthorization:
      false,
    requiresConfirmation:
      false,
    enabled:
      true,
  },

  {
    id:
      "device.refresh",
    domain:
      "devices",
    name:
      "refresh-device",
    label:
      "Refresh device",
    description:
      "Refresh device telemetry and lifecycle state.",
    risk:
      "read" as const,
    requiresAuthorization:
      false,
    requiresConfirmation:
      false,
    enabled:
      true,
  },

  {
    id:
      "lock.refresh",
    domain:
      "locks",
    name:
      "refresh-lock",
    label:
      "Refresh lock",
    description:
      "Refresh lock state.",
    risk:
      "read" as const,
    requiresAuthorization:
      false,
    requiresConfirmation:
      false,
    enabled:
      true,
  },

  {
    id:
      "lock.secure",
    domain:
      "locks",
    name:
      "secure-lock",
    label:
      "Secure lock",
    description:
      "Request a lock-secure transition.",
    risk:
      "high" as const,
    requiresAuthorization:
      true,
    requiresConfirmation:
      true,
    enabled:
      true,
  },

  {
    id:
      "lock.release",
    domain:
      "locks",
    name:
      "release-lock",
    label:
      "Release lock",
    description:
      "Request a lock-release transition.",
    risk:
      "high" as const,
    requiresAuthorization:
      true,
    requiresConfirmation:
      true,
    enabled:
      true,
  },

  {
    id:
      "device.reconcile",
    domain:
      "devices",
    name:
      "reconcile-device",
    label:
      "Reconcile device",
    description:
      "Request device state reconciliation.",
    risk:
      "medium" as const,
    requiresAuthorization:
      true,
    requiresConfirmation:
      false,
    enabled:
      true,
  },

  {
    id:
      "security.freeze",
    domain:
      "security",
    name:
      "freeze-security",
    label:
      "Freeze security",
    description:
      "Request an emergency security freeze.",
    risk:
      "critical" as const,
    requiresAuthorization:
      true,
    requiresConfirmation:
      true,
    enabled:
      true,
  },

  {
    id:
      "security.unfreeze",
    domain:
      "security",
    name:
      "unfreeze-security",
    label:
      "Release security freeze",
    description:
      "Request controlled security recovery.",
    risk:
      "critical" as const,
    requiresAuthorization:
      true,
    requiresConfirmation:
      true,
    enabled:
      true,
  },
];

export function registerCanonicalCommands(): void {
  for (
    const command of
      commands
  ) {
    registerCommand(
      command,
    );
  }
}

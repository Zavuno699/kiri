import {
  registerPolicy,
} from "../registry/policyRegistry";

const policies = [
  {
    id:
      "global.authenticated-operator",
    domain:
      "global",
    name:
      "authenticated-operator",
    label:
      "Authenticated operator",
    description:
      "Operational commands require an authenticated operator.",
    effect:
      "allow" as const,
    enabled:
      true,
    priority:
      100,
  },

  {
    id:
      "global.domain-access",
    domain:
      "global",
    name:
      "domain-access",
    label:
      "Domain access",
    description:
      "The subject must have access to the requested domain.",
    effect:
      "allow" as const,
    enabled:
      true,
    priority:
      90,
  },

  {
    id:
      "security.fail-closed",
    domain:
      "security",
    name:
      "security-fail-closed",
    label:
      "Security fail-closed",
    description:
      "Unresolved security authorization denies the action.",
    effect:
      "deny" as const,
    enabled:
      true,
    priority:
      1000,
  },

  {
    id:
      "locks.protected-transition",
    domain:
      "locks",
    name:
      "protected-transition",
    label:
      "Protected lock transition",
    description:
      "Lock transitions require explicit policy approval.",
    effect:
      "conditional" as const,
    enabled:
      true,
    priority:
      800,
  },

  {
    id:
      "devices.reconciliation",
    domain:
      "devices",
    name:
      "device-reconciliation",
    label:
      "Device reconciliation",
    description:
      "Device reconciliation requires a valid operational context.",
    effect:
      "conditional" as const,
    enabled:
      true,
    priority:
      700,
  },

  {
    id:
      "payments.integrity",
    domain:
      "payments",
    name:
      "payment-integrity",
    label:
      "Payment integrity",
    description:
      "Payment-sensitive actions require consistent financial state.",
    effect:
      "conditional" as const,
    enabled:
      true,
    priority:
      750,
  },

  {
    id:
      "leases.active-context",
    domain:
      "leases",
    name:
      "active-lease-context",
    label:
      "Active lease context",
    description:
      "Lease-dependent operations require an active lease context.",
    effect:
      "conditional" as const,
    enabled:
      true,
    priority:
      750,
  },
];

export function registerCanonicalPolicies(): void {
  for (
    const policy of
      policies
  ) {
    registerPolicy(
      policy,
    );
  }
}

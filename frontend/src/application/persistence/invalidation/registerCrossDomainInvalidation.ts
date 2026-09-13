import {
  registerInvalidationRule,
} from "./invalidationRegistry";

const rules = [
  {
    key:
      "payments.invalidates.dashboard",

    sourceDomain:
      "payments",

    sourceResource:
      "payments",

    targetDomain:
      "dashboard",

    targetResource:
      "dashboard",

    reason:
      "mutation" as const,
  },

  {
    key:
      "payments.invalidates.leases",

    sourceDomain:
      "payments",

    sourceResource:
      "payments",

    targetDomain:
      "leases",

    targetResource:
      "leases",

    reason:
      "mutation" as const,
  },

  {
    key:
      "leases.invalidates.dashboard",

    sourceDomain:
      "leases",

    sourceResource:
      "leases",

    targetDomain:
      "dashboard",

    targetResource:
      "dashboard",

    reason:
      "mutation" as const,
  },

  {
    key:
      "devices.invalidates.dashboard",

    sourceDomain:
      "devices",

    sourceResource:
      "devices",

    targetDomain:
      "dashboard",

    targetResource:
      "dashboard",

    reason:
      "mutation" as const,
  },

  {
    key:
      "locks.invalidates.dashboard",

    sourceDomain:
      "locks",

    sourceResource:
      "locks",

    targetDomain:
      "dashboard",

    targetResource:
      "dashboard",

    reason:
      "mutation" as const,
  },

  {
    key:
      "security.invalidates.dashboard",

    sourceDomain:
      "security",

    sourceResource:
      "security",

    targetDomain:
      "dashboard",

    targetResource:
      "dashboard",

    reason:
      "security" as const,
  },
];

export function registerCrossDomainInvalidation(): void {
  for (const rule of rules) {
    registerInvalidationRule(rule);
  }
}

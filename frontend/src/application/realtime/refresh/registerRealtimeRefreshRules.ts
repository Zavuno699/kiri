import {
  registerRealtimeRefreshRule,
} from "./realtimeRefreshRuleRegistry";

const rules = [
  {
    key:
      "dashboard.updated.refresh",

    domain:
      "dashboard",

    resourceKey:
      "dashboard",

    eventTypes: [
      "dashboard.updated",
    ],

    invalidatePersistence:
      true,

    refreshProjection:
      true,

    refreshDependents:
      false,
  },

  {
    key:
      "property.updated.refresh",

    domain:
      "properties",

    resourceKey:
      "properties",

    eventTypes: [
      "property.updated",
    ],

    invalidatePersistence:
      true,

    refreshProjection:
      true,

    refreshDependents:
      true,
  },

  {
    key:
      "lease.updated.refresh",

    domain:
      "leases",

    resourceKey:
      "leases",

    eventTypes: [
      "lease.updated",
    ],

    invalidatePersistence:
      true,

    refreshProjection:
      true,

    refreshDependents:
      true,
  },

  {
    key:
      "payment.updated.refresh",

    domain:
      "payments",

    resourceKey:
      "payments",

    eventTypes: [
      "payment.updated",
    ],

    invalidatePersistence:
      true,

    refreshProjection:
      true,

    refreshDependents:
      true,
  },

  {
    key:
      "device.updated.refresh",

    domain:
      "devices",

    resourceKey:
      "devices",

    eventTypes: [
      "device.updated",
    ],

    invalidatePersistence:
      true,

    refreshProjection:
      true,

    refreshDependents:
      true,
  },

  {
    key:
      "lock.updated.refresh",

    domain:
      "locks",

    resourceKey:
      "locks",

    eventTypes: [
      "lock.updated",
    ],

    invalidatePersistence:
      true,

    refreshProjection:
      true,

    refreshDependents:
      true,
  },

  {
    key:
      "security.updated.refresh",

    domain:
      "security",

    resourceKey:
      "security",

    eventTypes: [
      "security.updated",
    ],

    invalidatePersistence:
      true,

    refreshProjection:
      true,

    refreshDependents:
      true,
  },
];

export function registerCanonicalRealtimeRefreshRules(): void {
  for (const rule of rules) {
    registerRealtimeRefreshRule(
      rule,
    );
  }
}

import {
  registerDataDependency,
} from "./dependencyStore";

const dependencies = [
  {
    id:
      "property-lease-dependency",
    sourceDomain:
      "properties",
    sourceType:
      "property",
    targetDomain:
      "leases",
    targetType:
      "lease",
    reason:
      "Lease ownership depends on property context",
    required:
      true,
    directional:
      true,
  },

  {
    id:
      "lease-payment-dependency",
    sourceDomain:
      "leases",
    sourceType:
      "lease",
    targetDomain:
      "payments",
    targetType:
      "payment",
    reason:
      "Lease financial state depends on payment state",
    required:
      true,
    directional:
      true,
  },

  {
    id:
      "lease-device-dependency",
    sourceDomain:
      "leases",
    sourceType:
      "lease",
    targetDomain:
      "devices",
    targetType:
      "device",
    reason:
      "Device authorization depends on active lease state",
    required:
      true,
    directional:
      true,
  },

  {
    id:
      "lease-lock-dependency",
    sourceDomain:
      "leases",
    sourceType:
      "lease",
    targetDomain:
      "locks",
    targetType:
      "lock",
    reason:
      "Lock authorization depends on active lease state",
    required:
      true,
    directional:
      true,
  },

  {
    id:
      "device-lock-dependency",
    sourceDomain:
      "devices",
    sourceType:
      "device",
    targetDomain:
      "locks",
    targetType:
      "lock",
    reason:
      "Lock control depends on device state",
    required:
      true,
    directional:
      true,
  },

  {
    id:
      "security-device-dependency",
    sourceDomain:
      "security",
    sourceType:
      "security-state",
    targetDomain:
      "devices",
    targetType:
      "device",
    reason:
      "Security state controls device operations",
    required:
      true,
    directional:
      true,
  },

  {
    id:
      "security-lock-dependency",
    sourceDomain:
      "security",
    sourceType:
      "security-state",
    targetDomain:
      "locks",
    targetType:
      "lock",
    reason:
      "Security state controls lock operations",
    required:
      true,
    directional:
      true,
  },

  {
    id:
      "dashboard-aggregation-dependency",
    sourceDomain:
      "dashboard",
    sourceType:
      "dashboard",
    targetDomain:
      "properties",
    targetType:
      "property",
    reason:
      "Dashboard aggregates property state",
    required:
      false,
    directional:
      true,
  },
] as const;

export function registerCanonicalDependencies(): void {
  for (
    const dependency of
      dependencies
  ) {
    registerDataDependency(
      dependency,
    );
  }
}

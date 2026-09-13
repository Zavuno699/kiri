import {
  registerDomainDependency,
} from "./domainDependencyRegistry";

const matrix = [
  ["dashboard", "properties", "dashboard depends on property projection"],
  ["dashboard", "leases", "dashboard depends on lease projection"],
  ["dashboard", "payments", "dashboard depends on payment projection"],
  ["dashboard", "devices", "dashboard depends on device projection"],
  ["dashboard", "locks", "dashboard depends on lock projection"],
  ["dashboard", "security", "dashboard depends on security projection"],

  ["leases", "properties", "lease requires property context"],
  ["leases", "payments", "lease coordinates payment state"],
  ["leases", "devices", "lease authorizes devices"],
  ["leases", "locks", "lease authorizes locks"],

  ["payments", "leases", "payment reconciles lease state"],

  ["devices", "properties", "device belongs to property context"],
  ["devices", "leases", "device authorization depends on lease"],

  ["locks", "devices", "lock depends on device state"],
  ["locks", "leases", "lock authorization depends on lease"],

  ["security", "devices", "security controls device access"],
  ["security", "locks", "security controls lock access"],
  ["security", "dashboard", "security state affects operator dashboard"],
] as const;

export function registerCanonicalDomainDependencies(): void {
  for (
    const [
      source,
      target,
      reason,
    ] of matrix
  ) {
    registerDomainDependency({
      source,
      target,
      required: true,
      reason,
    });
  }
}

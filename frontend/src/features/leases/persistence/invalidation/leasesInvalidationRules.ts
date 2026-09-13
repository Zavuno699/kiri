import {
  registerInvalidationRule,
} from "../../../../application/persistence/invalidation/invalidationRegistry";

export function registerLeasesInvalidationRules(): void {
  registerInvalidationRule({
    key:
      "leases.mutation.invalidate",

    sourceDomain:
      "leases",

    sourceResource:
      "leases",

    targetDomain:
      "leases",

    targetResource:
      "leases",

    reason:
      "mutation",
  });
}

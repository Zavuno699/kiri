import {
  registerInvalidationRule,
} from "../../../../application/persistence/invalidation/invalidationRegistry";

export function registerLocksInvalidationRules(): void {
  registerInvalidationRule({
    key:
      "locks.mutation.invalidate",

    sourceDomain:
      "locks",

    sourceResource:
      "locks",

    targetDomain:
      "locks",

    targetResource:
      "locks",

    reason:
      "mutation",
  });
}

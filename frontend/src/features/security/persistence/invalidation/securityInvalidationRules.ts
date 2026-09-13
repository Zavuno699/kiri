import {
  registerInvalidationRule,
} from "../../../../application/persistence/invalidation/invalidationRegistry";

export function registerSecurityInvalidationRules(): void {
  registerInvalidationRule({
    key:
      "security.mutation.invalidate",

    sourceDomain:
      "security",

    sourceResource:
      "security",

    targetDomain:
      "security",

    targetResource:
      "security",

    reason:
      "mutation",
  });
}

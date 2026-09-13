import {
  registerInvalidationRule,
} from "../../../../application/persistence/invalidation/invalidationRegistry";

export function registerPaymentsInvalidationRules(): void {
  registerInvalidationRule({
    key:
      "payments.mutation.invalidate",

    sourceDomain:
      "payments",

    sourceResource:
      "payments",

    targetDomain:
      "payments",

    targetResource:
      "payments",

    reason:
      "mutation",
  });
}

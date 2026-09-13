import {
  registerInvalidationRule,
} from "../../../../application/persistence/invalidation/invalidationRegistry";

export function registerDashboardInvalidationRules(): void {
  registerInvalidationRule({
    key:
      "dashboard.mutation.invalidate",

    sourceDomain:
      "dashboard",

    sourceResource:
      "dashboard",

    targetDomain:
      "dashboard",

    targetResource:
      "dashboard",

    reason:
      "mutation",
  });
}

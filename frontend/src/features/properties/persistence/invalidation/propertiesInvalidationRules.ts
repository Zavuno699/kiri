import {
  registerInvalidationRule,
} from "../../../../application/persistence/invalidation/invalidationRegistry";

export function registerPropertiesInvalidationRules(): void {
  registerInvalidationRule({
    key:
      "properties.mutation.invalidate",

    sourceDomain:
      "properties",

    sourceResource:
      "properties",

    targetDomain:
      "properties",

    targetResource:
      "properties",

    reason:
      "mutation",
  });
}

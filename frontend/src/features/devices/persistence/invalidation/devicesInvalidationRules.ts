import {
  registerInvalidationRule,
} from "../../../../application/persistence/invalidation/invalidationRegistry";

export function registerDevicesInvalidationRules(): void {
  registerInvalidationRule({
    key:
      "devices.mutation.invalidate",

    sourceDomain:
      "devices",

    sourceResource:
      "devices",

    targetDomain:
      "devices",

    targetResource:
      "devices",

    reason:
      "mutation",
  });
}

import {
  registerDomainCachePolicy,
} from "../../../../application/persistence/runtime/registerCachePolicy";

export function registerDevicesCache(): void {
  registerDomainCachePolicy(
    "devices",
    "devices",
  );
}

import {
  registerDomainCachePolicy,
} from "../../../../application/persistence/runtime/registerCachePolicy";

export function registerPropertiesCache(): void {
  registerDomainCachePolicy(
    "properties",
    "properties",
  );
}

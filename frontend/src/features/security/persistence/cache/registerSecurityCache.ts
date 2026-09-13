import {
  registerDomainCachePolicy,
} from "../../../../application/persistence/runtime/registerCachePolicy";

export function registerSecurityCache(): void {
  registerDomainCachePolicy(
    "security",
    "security",
  );
}

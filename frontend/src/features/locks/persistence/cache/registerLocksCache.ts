import {
  registerDomainCachePolicy,
} from "../../../../application/persistence/runtime/registerCachePolicy";

export function registerLocksCache(): void {
  registerDomainCachePolicy(
    "locks",
    "locks",
  );
}

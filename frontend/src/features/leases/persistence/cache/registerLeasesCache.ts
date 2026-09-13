import {
  registerDomainCachePolicy,
} from "../../../../application/persistence/runtime/registerCachePolicy";

export function registerLeasesCache(): void {
  registerDomainCachePolicy(
    "leases",
    "leases",
  );
}

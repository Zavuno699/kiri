import {
  registerDomainCachePolicy,
} from "../../../../application/persistence/runtime/registerCachePolicy";

export function registerPaymentsCache(): void {
  registerDomainCachePolicy(
    "payments",
    "payments",
  );
}

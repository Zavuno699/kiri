import {
  registerDomainCachePolicy,
} from "../../../../application/persistence/runtime/registerCachePolicy";

export function registerDashboardCache(): void {
  registerDomainCachePolicy(
    "dashboard",
    "dashboard",
  );
}

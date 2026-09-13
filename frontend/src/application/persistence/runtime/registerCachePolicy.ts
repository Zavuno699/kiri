import {
  registerCachePolicy as register,
} from "../registry/persistenceRegistry";

export function registerDomainCachePolicy(
  domain: string,
  resourceKey: string,
  ttlMs = 30_000,
  staleWhileRevalidateMs = 15_000,
  invalidateOnMutation = true,
): void {
  register({
    key:
      `${domain}.${resourceKey}`,
    domain,
    resourceKey,
    ttlMs,
    staleWhileRevalidateMs,
    invalidateOnMutation,
  });
}

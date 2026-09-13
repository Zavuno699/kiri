import type {
  CachePolicy,
} from "../contracts/cachePolicy";

const policies = new Map<
  string,
  CachePolicy
>();

export function registerCachePolicy(
  policy: CachePolicy,
): void {
  policies.set(
    policy.key,
    policy,
  );
}

export function getCachePolicy(
  key: string,
): CachePolicy | null {
  return policies.get(key) ?? null;
}

export function listCachePolicies(): CachePolicy[] {
  return [...policies.values()];
}

export interface CacheConsistencyResult {
  consistent: boolean;
  staleKeys: string[];
  missingKeys: string[];
  checkedAt: string;
}

export function evaluateCacheConsistency(
  cachedKeys: string[],
  requiredKeys: string[],
): CacheConsistencyResult {
  const cached = new Set(cachedKeys);
  const required = new Set(requiredKeys);

  return {
    consistent:
      requiredKeys.every((key) => cached.has(key)) &&
      cachedKeys.every((key) => required.has(key)),
    staleKeys: cachedKeys.filter(
      (key) => !required.has(key),
    ),
    missingKeys: requiredKeys.filter(
      (key) => !cached.has(key),
    ),
    checkedAt: new Date().toISOString(),
  };
}

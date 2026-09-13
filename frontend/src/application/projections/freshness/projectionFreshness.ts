export type ProjectionFreshnessLevel =
  | "fresh"
  | "aging"
  | "stale"
  | "unknown";

export type ProjectionFreshnessPolicy = {
  freshWithinMs: number;
  agingWithinMs: number;
};

export type ProjectionFreshnessResult = {
  level: ProjectionFreshnessLevel;
  ageMs: number | null;
  fresh: boolean;
  requiresRefresh: boolean;
};

export function evaluateProjectionFreshness(
  updatedAt: string | undefined,
  now = Date.now(),
  policy: ProjectionFreshnessPolicy = {
    freshWithinMs: 5_000,
    agingWithinMs: 30_000,
  },
): ProjectionFreshnessResult {
  if (!updatedAt) {
    return {
      level: "unknown",
      ageMs: null,
      fresh: false,
      requiresRefresh: true,
    };
  }

  const ageMs = Math.max(0, now - Date.parse(updatedAt));

  if (ageMs <= policy.freshWithinMs) {
    return {
      level: "fresh",
      ageMs,
      fresh: true,
      requiresRefresh: false,
    };
  }

  if (ageMs <= policy.agingWithinMs) {
    return {
      level: "aging",
      ageMs,
      fresh: false,
      requiresRefresh: false,
    };
  }

  return {
    level: "stale",
    ageMs,
    fresh: false,
    requiresRefresh: true,
  };
}

import type { ConsistencyCheck } from "../contracts/consistencyCheck";
import type { ConsistencyStatus } from "../consistencyTypes";

export function calculateConsistencyScore(
  checks: ConsistencyCheck[],
): number {
  if (checks.length === 0) {
    return 0;
  }

  const total = checks.reduce(
    (sum, check) => sum + Math.max(0, Math.min(100, check.score)),
    0,
  );

  return Math.round(total / checks.length);
}

export function calculateConsistencyStatus(
  checks: ConsistencyCheck[],
): ConsistencyStatus {
  if (checks.length === 0) {
    return "unknown";
  }

  if (
    checks.some(
      (check) => check.severity === "critical",
    )
  ) {
    return "critical";
  }

  if (
    checks.some(
      (check) => check.status === "drifted",
    )
  ) {
    return "drifted";
  }

  if (
    checks.some(
      (check) => check.status === "warning",
    )
  ) {
    return "warning";
  }

  return "consistent";
}

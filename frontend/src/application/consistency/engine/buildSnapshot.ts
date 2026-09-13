import type { ConsistencyCheck } from "../contracts/consistencyCheck";
import type { ConsistencySnapshot } from "../contracts/consistencySnapshot";
import {
  calculateConsistencyScore,
  calculateConsistencyStatus,
} from "./scoreConsistency";

export function buildConsistencySnapshot(
  checks: ConsistencyCheck[],
): ConsistencySnapshot {
  return {
    status: calculateConsistencyStatus(checks),
    score: calculateConsistencyScore(checks),
    totalChecks: checks.length,
    passedChecks: checks.filter(
      (check) => check.status === "consistent",
    ).length,
    warningChecks: checks.filter(
      (check) => check.status === "warning",
    ).length,
    failedChecks: checks.filter(
      (check) =>
        check.status === "drifted" ||
        check.status === "critical",
    ).length,
    checks,
    generatedAt: new Date().toISOString(),
  };
}

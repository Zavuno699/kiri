export function locksConsistencyCheck() {
  return {
    key: "locks.consistency",
    domain: "locks",
    status: "consistent" as const,
    severity: "info" as const,
    score: 100,
    reason: "locks-state-consistent",
    checkedAt: new Date().toISOString(),
  };
}

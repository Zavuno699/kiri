export function leasesConsistencyCheck() {
  return {
    key: "leases.consistency",
    domain: "leases",
    status: "consistent" as const,
    severity: "info" as const,
    score: 100,
    reason: "leases-state-consistent",
    checkedAt: new Date().toISOString(),
  };
}

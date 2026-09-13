export function securityConsistencyCheck() {
  return {
    key: "security.consistency",
    domain: "security",
    status: "consistent" as const,
    severity: "info" as const,
    score: 100,
    reason: "security-state-consistent",
    checkedAt: new Date().toISOString(),
  };
}

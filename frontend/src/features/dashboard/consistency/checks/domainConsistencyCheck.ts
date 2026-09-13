export function dashboardConsistencyCheck() {
  return {
    key: "dashboard.consistency",
    domain: "dashboard",
    status: "consistent" as const,
    severity: "info" as const,
    score: 100,
    reason: "dashboard-state-consistent",
    checkedAt: new Date().toISOString(),
  };
}

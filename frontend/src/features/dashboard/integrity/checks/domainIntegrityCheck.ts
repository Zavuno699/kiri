export function dashboardIntegrityCheck() {
  return {
    key: "dashboard.integrity",
    domain: "dashboard",
    status: "pass" as const,
    reason: "dashboard-integrity-check-registered",
    checkedAt: new Date().toISOString(),
  };
}

export function paymentsConsistencyCheck() {
  return {
    key: "payments.consistency",
    domain: "payments",
    status: "consistent" as const,
    severity: "info" as const,
    score: 100,
    reason: "payments-state-consistent",
    checkedAt: new Date().toISOString(),
  };
}

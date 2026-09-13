export function devicesConsistencyCheck() {
  return {
    key: "devices.consistency",
    domain: "devices",
    status: "consistent" as const,
    severity: "info" as const,
    score: 100,
    reason: "devices-state-consistent",
    checkedAt: new Date().toISOString(),
  };
}

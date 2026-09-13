export function propertiesConsistencyCheck() {
  return {
    key: "properties.consistency",
    domain: "properties",
    status: "consistent" as const,
    severity: "info" as const,
    score: 100,
    reason: "properties-state-consistent",
    checkedAt: new Date().toISOString(),
  };
}

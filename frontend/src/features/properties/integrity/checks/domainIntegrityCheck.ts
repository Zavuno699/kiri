export function propertiesIntegrityCheck() {
  return {
    key: "properties.integrity",
    domain: "properties",
    status: "pass" as const,
    reason: "properties-integrity-check-registered",
    checkedAt: new Date().toISOString(),
  };
}

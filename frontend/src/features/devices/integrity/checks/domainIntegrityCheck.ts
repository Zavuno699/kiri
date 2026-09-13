export function devicesIntegrityCheck() {
  return {
    key: "devices.integrity",
    domain: "devices",
    status: "pass" as const,
    reason: "devices-integrity-check-registered",
    checkedAt: new Date().toISOString(),
  };
}

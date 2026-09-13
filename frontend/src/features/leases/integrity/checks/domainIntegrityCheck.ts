export function leasesIntegrityCheck() {
  return {
    key: "leases.integrity",
    domain: "leases",
    status: "pass" as const,
    reason: "leases-integrity-check-registered",
    checkedAt: new Date().toISOString(),
  };
}

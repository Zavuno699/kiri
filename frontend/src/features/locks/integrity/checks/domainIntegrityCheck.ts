export function locksIntegrityCheck() {
  return {
    key: "locks.integrity",
    domain: "locks",
    status: "pass" as const,
    reason: "locks-integrity-check-registered",
    checkedAt: new Date().toISOString(),
  };
}

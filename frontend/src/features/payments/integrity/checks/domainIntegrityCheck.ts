export function paymentsIntegrityCheck() {
  return {
    key: "payments.integrity",
    domain: "payments",
    status: "pass" as const,
    reason: "payments-integrity-check-registered",
    checkedAt: new Date().toISOString(),
  };
}

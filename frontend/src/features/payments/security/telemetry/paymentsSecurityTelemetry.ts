export function recordPaymentsSecurityTelemetry(
  action: string,
  allowed: boolean,
): {
  domain: string;
  action: string;
  allowed: boolean;
  occurredAt: string;
} {
  return {
    domain:
      "payments",

    action,

    allowed,

    occurredAt:
      new Date().toISOString(),
  };
}

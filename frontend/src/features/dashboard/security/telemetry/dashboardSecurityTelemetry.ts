export function recordDashboardSecurityTelemetry(
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
      "dashboard",

    action,

    allowed,

    occurredAt:
      new Date().toISOString(),
  };
}

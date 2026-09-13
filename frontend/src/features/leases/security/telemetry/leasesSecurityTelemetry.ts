export function recordLeasesSecurityTelemetry(
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
      "leases",

    action,

    allowed,

    occurredAt:
      new Date().toISOString(),
  };
}

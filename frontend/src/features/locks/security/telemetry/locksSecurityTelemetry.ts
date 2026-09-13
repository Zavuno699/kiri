export function recordLocksSecurityTelemetry(
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
      "locks",

    action,

    allowed,

    occurredAt:
      new Date().toISOString(),
  };
}

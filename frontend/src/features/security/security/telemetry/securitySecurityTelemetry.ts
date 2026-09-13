export function recordSecuritySecurityTelemetry(
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
      "security",

    action,

    allowed,

    occurredAt:
      new Date().toISOString(),
  };
}

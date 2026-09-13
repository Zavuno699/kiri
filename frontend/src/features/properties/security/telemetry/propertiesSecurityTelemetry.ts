export function recordPropertiesSecurityTelemetry(
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
      "properties",

    action,

    allowed,

    occurredAt:
      new Date().toISOString(),
  };
}

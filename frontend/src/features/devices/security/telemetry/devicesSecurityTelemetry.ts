export function recordDevicesSecurityTelemetry(
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
      "devices",

    action,

    allowed,

    occurredAt:
      new Date().toISOString(),
  };
}

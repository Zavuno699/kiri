export interface SecurityTelemetryEvent {
  name: string;
  value: number;
  occurredAt: string;
  principal: string | null;
  dimensions?: Record<string, string>;
}

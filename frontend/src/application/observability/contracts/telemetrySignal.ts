export interface TelemetrySignal {
  id: string;
  type:
    | "counter"
    | "gauge"
    | "latency"
    | "status"
    | "throughput";
  name: string;
  domain: string;
  value: number;
  unit: string;
  severity:
    | "info"
    | "warning"
    | "critical";
  recordedAt: string;
  metadata: Record<string, unknown>;
}

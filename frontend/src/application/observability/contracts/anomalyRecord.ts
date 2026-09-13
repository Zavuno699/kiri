export interface AnomalyRecord {
  id: string;
  domain: string;
  entityId: string | null;
  type:
    | "missing-event"
    | "projection-lag"
    | "state-drift"
    | "authorization"
    | "latency"
    | "unknown";
  severity:
    | "low"
    | "medium"
    | "high"
    | "critical";
  title: string;
  description: string;
  correlationId: string | null;
  detectedAt: string;
  resolved: boolean;
}

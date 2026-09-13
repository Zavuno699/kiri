export interface HealthSignal {
  id: string;
  component: string;
  domain: string;
  status:
    | "healthy"
    | "degraded"
    | "critical"
    | "unknown";
  message: string;
  checkedAt: string;
  latencyMs: number | null;
}

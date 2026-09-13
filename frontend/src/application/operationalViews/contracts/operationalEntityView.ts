export interface OperationalEntityView {
  id: string;
  domain: string;
  type: string;
  title: string;
  subtitle: string | null;
  status: string;
  health: "healthy" | "degraded" | "critical" | "unknown";
  metadata: Record<string, unknown>;
}

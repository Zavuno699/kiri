export type IncidentSeverity =
  | "info"
  | "warning"
  | "critical"
  | "emergency";

export type IncidentStatus =
  | "open"
  | "acknowledged"
  | "investigating"
  | "mitigating"
  | "recovering"
  | "resolved"
  | "closed";

export interface Incident {
  id: string;
  domain: string;
  title: string;
  description: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  createdAt: string;
  acknowledgedAt: string | null;
  resolvedAt: string | null;
  operatorId: string | null;
  resourceIds: string[];
}

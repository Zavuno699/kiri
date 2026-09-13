export type DomainHealthStatus =
  | "healthy"
  | "degraded"
  | "unavailable"
  | "unknown";

export interface DomainHealth {
  domain: string;
  status: DomainHealthStatus;
  score: number;
  lastCheckedAt: string;
  reasons: string[];
}

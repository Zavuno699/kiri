import type { DomainHealth } from "../contracts/domainHealth";

export interface DomainHealthState {
  initialized: boolean;
  domains: DomainHealth[];
  overall:
    | "healthy"
    | "degraded"
    | "failed"
    | "unknown";
  score: number;
}

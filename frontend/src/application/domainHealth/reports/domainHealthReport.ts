import type { DomainHealth } from "../contracts/domainHealth";

export interface DomainHealthReport {
  generatedAt: string;
  score: number;
  domains: DomainHealth[];
}

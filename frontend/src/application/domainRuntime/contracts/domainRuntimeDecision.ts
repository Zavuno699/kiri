export interface DomainRuntimeDecision {
  domain: string;
  action: string;
  allowed: boolean;
  capability: string;
  reason: string;
  evaluatedAt: string;
}

import type {
  DomainHealth,
} from "../contracts/domainHealth";

export function createDomainHealth(
  domain: string,
  input?: {
    status?: DomainHealth["status"];
    score?: number;
    reasons?: string[];
  },
): DomainHealth {
  return {
    domain,
    status: input?.status ?? "healthy",
    score: input?.score ?? 100,
    lastCheckedAt: new Date().toISOString(),
    reasons: input?.reasons ?? [],
  };
}

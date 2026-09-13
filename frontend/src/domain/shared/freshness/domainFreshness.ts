export type DomainFreshness = {
  domain: string;
  updatedAt?: string;
  ageMs: number | null;
  fresh: boolean;
  stale: boolean;
};

export interface CachePolicy {
  key: string;
  domain: string;
  resourceKey: string;
  ttlMs: number;
  staleWhileRevalidateMs: number;
  invalidateOnMutation: boolean;
}

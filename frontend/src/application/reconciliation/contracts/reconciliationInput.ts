export interface ReconciliationInput<T> {
  local: T | null;
  authoritative: T | null;
  version?: number | null;
  authoritativeVersion?: number | null;
  observedAt?: string | null;
}

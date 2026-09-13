export interface ApiHealthState {
  initialized: boolean;
  reachable: boolean;
  degraded: boolean;
  reason: string | null;
  checkedAt: string | null;
}

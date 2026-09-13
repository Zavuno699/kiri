export interface SessionRefreshState {
  refreshing: boolean;
  lastRefreshAt: string | null;
  error: string | null;
}

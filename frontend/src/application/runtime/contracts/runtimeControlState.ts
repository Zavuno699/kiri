export interface RuntimeControlState {
  started: boolean;
  operational: boolean;
  degraded: boolean;
  safeMode: boolean;
  startedAt: string | null;
  lastTransitionAt: string | null;
  reasons: string[];
}

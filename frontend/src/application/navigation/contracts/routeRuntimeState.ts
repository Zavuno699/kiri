export interface RouteRuntimeState {
  route: string;
  domain: string;
  active: boolean;
  initialized: boolean;
  guarded: boolean;
  accessible: boolean;
  lastVisitedAt: string | null;
}

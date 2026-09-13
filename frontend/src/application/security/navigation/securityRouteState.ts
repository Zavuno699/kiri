
export interface SecurityRouteState {
  authenticated: boolean;
  sessionActive: boolean;
  authorized: boolean;
  restricted: boolean;
  redirectTo?: string;
}


export interface GlobalOperatorControlState {
  initialized: boolean;
  authenticated: boolean;
  sessionActive: boolean;
  rbacReady: boolean;
  navigationReady: boolean;
  actionPlaneReady: boolean;
  securityReady: boolean;
  consistencyReady: boolean;
  degradedMode:
    | "normal"
    | "limited"
    | "restricted"
    | "critical";
  domainHealthScore: number;
  consistencyScore: number;
  operatorReady: boolean;
  reasons: string[];
}

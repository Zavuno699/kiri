export type UnifiedRuntimeStatus =
  | "unknown"
  | "starting"
  | "ready"
  | "limited"
  | "restricted"
  | "failed"
  | "stopped";

export interface UnifiedRuntimeState {
  initialized: boolean;
  status: UnifiedRuntimeStatus;
  authenticationReady: boolean;
  securityReady: boolean;
  rbacReady: boolean;
  navigationReady: boolean;
  actionPlaneReady: boolean;
  consistencyReady: boolean;
  healthReady: boolean;
  orchestrationReady: boolean;
  degradedMode:
    | "normal"
    | "limited"
    | "restricted"
    | "critical";
  consistencyScore: number;
  domainHealthScore: number;
  operatorReady: boolean;
  startedAt: string | null;
  lastRefreshAt: string | null;
  reasons: string[];
}

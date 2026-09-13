export interface UnifiedRuntimeContext {
  principal: string | null;
  sessionId: string | null;
  roles: string[];
  capabilities: string[];
  degradedMode:
    | "normal"
    | "limited"
    | "restricted"
    | "critical";
  consistencyScore: number;
  domainHealthScore: number;
  correlationId: string | null;
}

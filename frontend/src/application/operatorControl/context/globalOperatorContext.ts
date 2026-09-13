export interface GlobalOperatorContext {
  principal: string | null;
  sessionId: string | null;
  roles: string[];
  capabilities: string[];
  degradedMode:
    | "normal"
    | "limited"
    | "restricted"
    | "critical";
  currentPath: string | null;
  correlationId: string | null;
}

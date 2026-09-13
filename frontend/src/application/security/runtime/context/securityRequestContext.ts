export interface SecurityRequestContext {
  principal: string | null;
  sessionId: string | null;
  tenantId: string | null;
  correlationId: string | null;
  authenticated: boolean;
  sessionActive: boolean;
}

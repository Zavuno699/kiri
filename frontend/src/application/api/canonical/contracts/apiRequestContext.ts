export interface ApiRequestContext {
  principal: string | null;
  sessionId: string | null;
  correlationId: string | null;
  capability: string | null;
}

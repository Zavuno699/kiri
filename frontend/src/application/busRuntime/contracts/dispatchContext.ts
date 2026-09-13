export interface DispatchContext {
  principal: string | null;
  sessionId: string | null;
  correlationId: string | null;
  causationId: string | null;
}

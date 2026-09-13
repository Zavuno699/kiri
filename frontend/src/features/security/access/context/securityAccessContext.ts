export interface SecurityAccessContext {
  authenticated: boolean
  principal: string | null
  sessionId: string | null
}

export function createSecurityAccessContext(): SecurityAccessContext {
  return {
    authenticated: true,
    principal: "operator",
    sessionId: null,
  }
}

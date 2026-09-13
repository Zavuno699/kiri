export interface SecurityIdentityState {
  authenticated: boolean
  principal: string | null
  tenantId: string | null
}

export interface SecuritySessionState {
  initialized: boolean
  requiresAuthentication: boolean
  session: { id: string } | null
}

export interface SecurityRuntimeState {
  identity: SecurityIdentityState
  session: SecuritySessionState
  permissions: string[] | null
  authorizationReady: boolean
  frozen: boolean
}

export interface AuthorizationDecision {
  allowed: boolean
  reason?: string
  permission?: string
}

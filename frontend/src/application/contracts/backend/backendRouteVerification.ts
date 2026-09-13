export interface BackendRouteVerification {
  domain: string
  method: string
  path: string
  verified: boolean
  reason?: string
}

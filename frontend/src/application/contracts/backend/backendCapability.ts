export interface BackendCapability {
  id: string
  domain: string
  readable: boolean
  writable: boolean
  commandable: boolean
  verified: boolean
  reason?: string
}

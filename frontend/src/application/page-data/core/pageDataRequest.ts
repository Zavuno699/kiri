export interface PageDataRequest {
  domain: string
  route: string
  entityId?: string
  query?: Record<string, unknown>
  correlationId?: string
}

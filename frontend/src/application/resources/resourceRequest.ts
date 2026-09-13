export interface ResourceRequest {
  key: string
  domain: string
  path: string
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  query?: Record<string, unknown>
  body?: unknown
  correlationId?: string
}

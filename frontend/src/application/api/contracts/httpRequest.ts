import type { HttpMethod } from "./httpMethod"

export interface HttpRequest<T = unknown> {
  method: HttpMethod
  path: string
  query?: Record<string, unknown>
  headers?: Record<string, string>
  body?: T
  correlationId?: string
}

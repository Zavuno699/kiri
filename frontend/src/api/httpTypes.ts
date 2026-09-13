export interface RequestOptions {
  method?: string
  headers?: Record<string, string>
  body?: BodyInit | null
  signal?: AbortSignal
}

export interface ApiEnvelope<T> {
  data: T
  correlationId?: string
}

export interface ApiHealth {
  status: string
  version?: string
  service?: string
}

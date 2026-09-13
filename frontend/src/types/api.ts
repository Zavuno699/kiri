export interface ApiError {
  code?: string
  message: string
  requestId?: string
  details?: unknown
}

export interface ApiEnvelope<T> {
  data: T
  error?: ApiError
  meta?: {
    requestId?: string
    correlationId?: string
  }
}

export interface ApiListEnvelope<T> {
  data: T[]
  total?: number
  meta?: {
    requestId?: string
    correlationId?: string
  }
}

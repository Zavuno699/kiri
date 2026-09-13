export interface HttpResponseMetadata {
  correlationId?: string
  requestId?: string
}

export interface HttpSuccessResponse<T> {
  data: T
  metadata?: HttpResponseMetadata
}

export interface HttpFailureResponse {
  error: {
    code: string
    message: string
    details?: unknown
  }
  metadata?: HttpResponseMetadata
}

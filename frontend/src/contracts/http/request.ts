export interface RequestMetadata {
  correlationId?: string
  causationId?: string
  idempotencyKey?: string
  operatorId?: string
}

export interface HttpRequestContract<T = unknown> {
  metadata?: RequestMetadata
  payload?: T
}

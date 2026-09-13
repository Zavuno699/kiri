export interface ResourceError {
  key: string
  status?: number
  code?: string
  message: string
  retryable: boolean
  correlationId?: string
}

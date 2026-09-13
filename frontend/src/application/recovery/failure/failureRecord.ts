export interface FailureRecord {
  id: string
  domain: string
  operation: string
  code: string
  message: string
  retryable: boolean
  occurredAt: string
}

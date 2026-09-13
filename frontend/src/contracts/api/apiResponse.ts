export interface ApiResponse<T> {
  data: T
  requestId?: string
}

export interface ApiErrorResponse {
  error: string
  code?: string
  requestId?: string
}

export interface CanonicalApiError {
  code: string;
  message: string;
  status: number;
  requestId: string | null;
  retryable: boolean;
}

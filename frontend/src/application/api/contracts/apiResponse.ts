export interface CanonicalApiResponse<T = unknown> {
  success: boolean;
  status: number;
  data: T | null;
  error: string | null;
  requestId: string | null;
}

export interface ApiResponse<T> {
  data: T | null;
  status: number;
  requestId: string | null;
  error: string | null;
  receivedAt: string;
}

export interface SecurityResponse<T = unknown> {
  data: T | null;
  success: boolean;
  error: string | null;
}

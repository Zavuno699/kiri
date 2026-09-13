export interface LocksResponse<T = unknown> {
  data: T | null;
  success: boolean;
  error: string | null;
}

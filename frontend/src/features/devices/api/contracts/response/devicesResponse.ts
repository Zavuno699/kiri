export interface DevicesResponse<T = unknown> {
  data: T | null;
  success: boolean;
  error: string | null;
}

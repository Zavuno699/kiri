export interface PaymentsResponse<T = unknown> {
  data: T | null;
  success: boolean;
  error: string | null;
}

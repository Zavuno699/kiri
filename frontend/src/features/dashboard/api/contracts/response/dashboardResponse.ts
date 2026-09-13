export interface DashboardResponse<T = unknown> {
  data: T | null;
  success: boolean;
  error: string | null;
}

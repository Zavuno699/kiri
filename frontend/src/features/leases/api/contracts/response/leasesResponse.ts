export interface LeasesResponse<T = unknown> {
  data: T | null;
  success: boolean;
  error: string | null;
}

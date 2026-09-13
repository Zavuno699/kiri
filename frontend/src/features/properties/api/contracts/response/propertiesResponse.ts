export interface PropertiesResponse<T = unknown> {
  data: T | null;
  success: boolean;
  error: string | null;
}
